import { withLayout } from '../../ccde-util/withLayout/index.js';
import { withAxisBottom } from '../../ccde-util/withAxisBottom/index.js';
import { withAxisLeft } from '../../ccde-util/withAxisLeft/index.js';
import { withTitle } from '../../ccde-util/withTitle/index.js';
import { withGroup } from '../../ccde-util/withGroup/index.js';
import { withTooltip } from '../../ccde-util/withTooltip/index.js';

import { lightBlue as defaultTheme } from '../../ccd3-theme/lightBlue.js';


class AlgorithmBar {
  constructor(domId, option, theme) {
    this._domId = domId;
    this._option = option;
    this._theme = theme ? theme : defaultTheme;
    withLayout.call(this, domId, option);
  }

  render() {
    withAxisBottom.call(this);
    withAxisLeft.call(this);
    withTitle.call(this);
    withGroup.call(this, '_rectGroup', 'rect-group', 'main');

    this.renderColorScale();
    this.renderRect();
  }

  renderColorScale() {
    const {
      algorithmBar: { state }
    } = this._option;

    this._colorScale = d3.scaleOrdinal()
      .domain(Object.keys(state))
      .range(Object.values(state));
  }

  renderRect() {
    const {
      algorithmBar: {
        uniqueKey,
        stateKey,
        animation: { duration, ease },
        on: { click },
      },
      axisBottom: {
        key: xKey,
      },
      axisLeft: { key: yKey },
      tooltip: { format }
    } = this._option;

    this._rectElements = this._rectGroup
      .selectAll('rect')
      .data(this._data, uniqueKey ? d => d[uniqueKey] : uniqueKey)
      .join(
        enter => enter.append('rect')
          .attr('width', this._bandwidth())
          .attr('y', this._innerHeight)
          .attr('x', d => this._bottomScale(d[xKey])),
        update => update,
        exit => exit.remove()
      )
      .transition()
      .duration(duration)
      .ease(ease)
      .attr('height', d => this._innerHeight - this._leftScale(d[yKey]))
      .attr('y', d => this._leftScale(d[yKey]))
      .attr('x', d => this._bottomScale(d[xKey]))
      .attr('fill', d => this._colorScale(d[stateKey]))
      .selection()
      .on('click', (e, d) => click(e, d, this._data));

    withTooltip.call(this, '_rectElements', format)
  }
}

export { AlgorithmBar }