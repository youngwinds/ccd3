import {
  withLayout,
  withTitle,
  withGroup,
  withTooltip
} from '../../ccde-util/index.js'

import { lightBlue as defaultTheme } from '../../ccd3-theme/lightBlue.js';

class VerticalTree {
  constructor(domId, option, theme) {
    this._domId = domId;
    this._option = option;
    this._theme = theme ? theme : defaultTheme;
    withLayout.call(this, domId, option);
  }

  render() {
    withTitle.call(this);
    withGroup.call(this, '_pathGroup', 'path-group', 'main');
    withGroup.call(this, '_nodeGroup', 'node-group', 'main');
    withGroup.call(this, '_textGroup', 'text-group', 'main');

    this.renderData();
    this.renderScale();
    this.renderPath();
    this.renderNode();
    this.renderText();
  }

  renderData() {
    const {
      verticalTree: { valueKey, childrenKey },
    } = this._option;

    const root = d3.hierarchy(this._data, d => d[childrenKey]);

    this._rootData = d3.tree()
      .size([this._innerWidth, this._innerHeight])
      // .separation((a, b) => a.parent == b.parent ? 1 : 2)
      (root);
  }

  renderScale() {
    const {
      verticalTree: {
        valueKey,
        node: { radiusExtent }
      }
    } = this._option;

    let max = -Infinity, min = Infinity;
    const dfs = (node) => {
      if (!node) return;
      max = Math.max(max, node[valueKey]);
      min = Math.min(min, node[valueKey]);
      node.children
        ? node.children.forEach(d => dfs(d))
        : null;
    }
    dfs(this._data);
    this._valueScale = d3.scaleLinear()
      .domain([min, max])
      .range(radiusExtent)
  }

  renderPath() {
    const {
      verticalTree: {
        uniqueKey,
        animation: { duration, ease }
      },

    } = this._option;

    const {
      primary1: lineColor
    } = this._theme;

    this._pathGroupElements = this._pathGroup
      .selectAll('path')
      .data(this._rootData.links(), d => d.target.data[uniqueKey])
      .join(
        enter => enter.append('path')
          .attr('d', d => {
            return d3.linkVertical()
              .x(d => d.x)
              .y(d => d.y)
              ({ source: d.source, target: d.source })
          })
        ,
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(duration)
      .ease(ease)
      .attr('stroke', lineColor)
      .attr('fill', 'none')
      .attr("d", d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y))
      .selection()
  }

  renderNode() {
    const {
      verticalTree: {
        uniqueKey,
        nodeKey,
        childrenKey,
        valueKey,
        animation: { duration, ease },
      },
      tooltip: { format }
    } = this._option;

    const {
      primary4: nodeColor
    } = this._theme;

    this._nodeGroupElements = this._nodeGroup
      .selectAll('circle')
      .data(this._rootData.descendants(), d => d.data[uniqueKey])
      .join(
        enter => enter.append('circle')
          .attr("transform", d => `translate(${d.x}, ${d.y})`),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(duration)
      .ease(ease)
      .attr('fill', nodeColor)
      .attr('r', d => this._valueScale(d.data[valueKey]))
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .selection()
      .style('cursor', 'pointer')
      .classed('subtree-hidden', d => d.data[`_${childrenKey}`] ? true : false)
      .classed('leaf-node', d => d.data[childrenKey] ? false : true)

    withTooltip.call(this, '_nodeGroupElements', format ? format : (e, d) => {
      return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
    })
  }

  renderText() {
    const {
      verticalTree: {
        nodeKey,
        valueKey,
        uniqueKey,
        animation: { duration, ease },
      },
      tooltip: { format }
    } = this._option;

    this._textGroupElements = this._textGroup
      .selectAll('text')
      .data(this._rootData.descendants(), d => d.data[uniqueKey])
      .join(
        enter => enter.append('text')
          .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(90)`),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(duration)
      .ease(ease)
      .attr('font-size', d => this._valueScale(d.data[valueKey]))
      .attr('dy', '0.31em')
      .attr('dx', '10')
      .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(90)`)
      .attr("dx", d => d.children ? '-1em' : '1em')
      .attr("text-anchor", d => d.children ? "end" : "start")
      .selection()
      .html(d => d.data[nodeKey])
      .style('cursor', 'pointer')

    withTooltip.call(this, '_textGroupElements', format ? format : (e, d) => {
      return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
    })
  }
}

export { VerticalTree }