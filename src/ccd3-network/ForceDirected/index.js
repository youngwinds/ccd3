import {
  withLayout,
  withTitle,
  withGroup,
  withTooltip
} from '../../ccde-util/index.js'

import { lightBlue as defaultTheme } from '../../ccd3-theme/lightBlue.js';

class ForceDirected {
  constructor(domId, option, theme) {
    this._domId = domId;
    this._option = option;
    this._theme = theme ? theme : defaultTheme;
    withLayout.call(this, domId, option);
  }

  render() {
    withTitle.call(this);

    withGroup.call(this, "_linkGroup", "link-group", "main");
    withGroup.call(this, "_nodeGroup", "node-group", "main");
    withGroup.call(this, "_textGroup", "text-group", "main");

    this.renderData();
    this.renderScale();
    this.renderForce();

    this.renderNode();
    this.renderLink();
    this.renderText();

    this.renderTick();
  }

  renderData() {
    const {
      nodes: { key: nodesKey },
      links: { key: linksKey }
    } = this._option;

    this._nodes = this._data[nodesKey];
    this._links = this._data[linksKey];
  }

  renderScale() {
    const {
      nodes: {
        nodeSizeExtent, nodeOpacityExtent, sizeKey, groupKey
      },
      links: {
        lineWidthExtent, lineOpacityExtent, valueKey
      },
    } = this._option;

    const {
      colorSets
    } = this._theme;

    this._nodeSizeScale = d3.scaleLinear()
      .domain(d3.extent(this._nodes, d => d[sizeKey]))
      .range(nodeSizeExtent);

    this._nodeOpacityScale = d3.scaleLinear()
      .domain(d3.extent(this._nodes, d => d[sizeKey]))
      .range(nodeOpacityExtent);

    this._linkWidthScale = d3.scaleLinear()
      .domain(d3.extent(this._links, d => d[valueKey]))
      .range(lineWidthExtent);

    this._linkOpacityScale = d3.scaleLinear()
      .domain(d3.extent(this._links, d => d[valueKey]))
      .range(lineOpacityExtent);

    this._nodeGroupScale = d3.scaleOrdinal()
      .domain(Array.from(new Set(this._nodes.map(d => d[groupKey]))))
      .range(colorSets);
  }

  renderForce() {
    const {
      nodes: { nameKey },
      forceSimulation: {
        forceCollide: { radius, strength: collideStrength },
        forceLink: { distance },
        forceManyBody: { strength: manyBodystrength, theta, distanceMin },
        forceX: { strength: xStrength, x },
        forceY: { strength: yStrength, y }
      }
    } = this._option;

    this._forceSimulation = d3.forceSimulation(this._nodes)
      .force("forceLink", d3.forceLink(this._links).id(d => d[nameKey]).distance(distance))
      .force("forceManyBody", d3.forceManyBody().strength(manyBodystrength).theta(theta).distanceMin(distanceMin))
      .force("forceCenter", d3.forceCenter(this._innerWidth / 2, this._innerHeight / 2))
      .force("forceCollide", d3.forceCollide().radius(radius).strength(collideStrength))
      .force("forceX", d3.forceX().x(x).strength(xStrength))
      .force("forceY", d3.forceY().y(y).strength(yStrength))
  }

  renderNode() {
    const {
      nodes: { sizeKey, groupKey,
        on: { click, mouseover, mouseout },
      },

      tooltip: { format }
    } = this._option;
    this._nodeGroupElements = this._nodeGroup
      .selectAll('circle')
      .data(this._nodes)
      .join('circle')
      .attr('fill', d => this._nodeGroupScale(d[groupKey]))
      .attr('fill-opacity', d => this._nodeOpacityScale(d[sizeKey]))
      .attr('r', d => this._nodeSizeScale(d[sizeKey]))
      .call(this.drag())
      .on('click', (event, d) => click(event, d, this._data))

    withTooltip.call(this, '_nodeGroupElements', format)
  }

  renderLink() {
    const {
      links: { sourceKey, targetKey, valueKey }
    } = this._option;

    const {
      primary4: linkColor
    } = this._theme;
    this._linkGroupElements = this._linkGroup
      .selectAll('line')
      .data(this._links)
      .join('line')
      .attr('stroke-opacity', d => this._linkOpacityScale(d[valueKey]))
      .attr('stroke', linkColor)
      .attr("d", (d) => 'M ' + d[sourceKey].x + ' ' + d[sourceKey].y + ' L ' + d[targetKey].x + ' ' + d[targetKey].y)
      .attr('stroke-width', d => this._linkWidthScale(d[valueKey]))
  }

  renderText() {
    const {
      nodes: { nameKey, sizeKey, groupKey,
        on: { click, mouseover, mouseout },
      },
      tooltip: { format }
    } = this._option;
    this._textGroupElements = this._textGroup
      .selectAll('text')
      .data(this._nodes)
      .join('text')
      .text(d => d[nameKey])
      .attr('fill', d => this._nodeGroupScale(d[groupKey]))
      .attr('fill-opacity', d => this._nodeOpacityScale(d[sizeKey]))
      .style("font-size", d => this._nodeSizeScale(d[sizeKey]))
      .call(this.drag())
      .on('click', (event, d) => click(event, d, this._data))

    withTooltip.call(this, '_textGroupElements', format)
  }

  renderTick() {
    const {
      links: { sourceKey, targetKey },
      nodes: { nodeSizeExtent }
    } = this._option;

    // 让文字贴近结点
    const textDx = (nodeSizeExtent[0] + nodeSizeExtent[1]) / 2;

    this._forceSimulation.on('tick', () => {

      this._textGroupElements.attr("transform", function (d) {
        return `translate(${d.x + textDx},${d.y})`
      });

      this._nodeGroupElements.attr("transform", function (d) {
        return `translate(${d.x},${d.y})`
      });

      this._linkGroupElements
        .attr("x1", (d) => d[sourceKey].x)
        .attr("y1", (d) => d[sourceKey].y)
        .attr("x2", (d) => d[targetKey].x)
        .attr("y2", (d) => d[targetKey].y);
    })
  }

  drag() {
    const dragStarted = (event, d) => {
      if (!event.active) this._forceSimulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    const dragged = (event, d) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    const dragEnded = (event, d) => {
      if (!event.active) this._forceSimulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    return d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
  }
}

export { ForceDirected }
