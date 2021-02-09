import {
  withLayout,
  withAxisBottom,
  withAxisLeft,
  withTitle,
  withGroup,
  withTooltip
} from '../../ccde-util/index.js'

import { lightBlue as defaultTheme } from '../../ccd3-theme/lightBlue.js';


class VerticalBar {
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

    this.renderRect();
  }

  renderRect() {
    const {
      verticalBar: {
        uniqueKey,
        animation: { duration, ease },
        on: { click },
      },
      axisBottom: {
        key: xKey,
      },
      axisLeft: { key: yKey },
      tooltip: { format }
    } = this._option;

    const {
      primary1
    } = this._theme;

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
      .attr('fill', primary1)
      .selection()
      .on('click', (e, d) => click(e, d, this._data));

    withTooltip.call(this, '_rectElements', format)
  }
}

export { VerticalBar }