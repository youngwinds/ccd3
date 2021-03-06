import {
  withLayout,
  withTitle,
  withGroup,
  withTooltip
} from '../../ccde-util/index.js'

import { lightBlue as defaultTheme } from '../../ccd3-theme/lightBlue.js';

class Pie {
  constructor(domId, option, theme) {
    this._domId = domId;
    this._option = option;
    this._theme = theme ? theme : defaultTheme;
    withLayout.call(this, domId, option);
  }

  render() {
    withTitle.call(this);

    withGroup.call(this, '_pathGroup', 'path-group', 'main', `translate(${this._innerWidth / 2},${this._innerHeight / 2})`);
    withGroup.call(this, '_legendGroup', 'legend-group', 'main', `translate(${this._innerWidth},${0})`);

    this.renderData();
    this.renderScale();
    this.renderPath();
    this.renderLegend();
  }

  renderData() {
    const {
      pie: { categoryKey, valueKey, innerRadius }
    } = this._option;

    this._radius = Math.min(this._innerHeight, this._innerWidth) / 2;

    this._pieData = d3.pie()
      .sort(d => d[categoryKey])
      .value(d => d[valueKey])(this._data);

    this._arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(this._radius);
  }

  renderScale() {
    const {
      pie: { categoryKey },
    } = this._option;

    const {
      colorSets
    } = this._theme;

    if (!this._colorScale)
      this._colorScale = d3.scaleOrdinal()
        .domain(this._data.map(d => d[categoryKey]))
        .range(colorSets)
  }

  renderPath() {
    const {
      pie: {
        uniqueKey,
        categoryKey,
        on: { click },
        animation: { duration, ease }
      },
      tooltip: { format },

    } = this._option;

    this._pathGroupElement = this._pathGroup
      .selectAll('path')
      .data(this._pieData, d => d.data[uniqueKey])
      .join('path')
      .transition()
      .duration(duration)
      .ease(ease)
      .attr('fill', d => this._colorScale(d.data[categoryKey]))
      .attr('d', d => this._arc(d))
      .selection()
      .on('click', (e, d) => click(e, d, this._data))

    withTooltip.call(this, '_pathGroupElement', format);
  }

  renderLegend() {
    this._legendGroupElements = this._legendGroup
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(this._colorScale.domain())
      .join("g")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    this._legendGroupElements
      .selectAll('rect')
      .data(d => [d])
      .join("rect")
      .attr("x", -19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", this._colorScale);

    this._legendGroupElements
      .selectAll('text')
      .data(d => [d])
      .join("text")
      .attr("x", -24)
      .attr("y", 9.5)
      .attr("dy", "0.35em")
      .text(d => d);
  }
}

export { Pie }