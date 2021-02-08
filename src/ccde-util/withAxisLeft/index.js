import { scaleBand } from './scaleBand.js';
import { scaleLinear } from './scaleLinear.js';

function withAxisLeft() {
  if (!this._option.axisLeft || !this._option.axisLeft.scale || !this._option.axisLeft.scale.name)
    throw new TypeError("[axisLeft] Error!");

  loadScale.call(this);
  loadAxis.call(this);
}

/**
 * Load corresponding scale by name.
 */
function loadScale() {
  const {
    axisLeft: {
      scale: {
        name
      }
    }
  } = this._option;

  switch (name) {
    case 'scaleBand': {
      scaleBand.call(this);
      break;
    }
    case 'scaleLinear': {
      scaleLinear.call(this);
      break;
    }
    default: {
      throw new Error("Unrecognized scale name");
    }
  }
}

/**
 * Load axis
 */
function loadAxis() {
  const addGroup = () => {
    if (this._axisLeftGroup)
      return;

    if (this._zoomGroup)
      this._axisLeftGroup = this._zoomGroup.insert('g', `#${this._domId}MainGroup`)
    else
      this._axisLeftGroup = this._svg.insert('g', `#${this._domId}MainGroup`)

    this._axisLeftGroup
      .attr('id', `${this._domId}axisLeftGroup`)
      .attr('class', `axis-bottom-group`)
      .attr('transform', `translate(${this._margin.left},${this._margin.top})`)
  }

  const addAxis = () => {
    const {
      axisLeft: {
        grid = false,
        transition: { duration, ease }
      }
    } = this._option;

    const {
      axisBottom: {
        tickColor = '#ccc',
        textColor = '#999',
        lineColor = '#ccc'
      }
    } = this._theme;

    this._axisLeftGroup
      .transition()
      .duration(duration)
      .ease(ease)
      .call(g => {
        const axis = d3.axisLeft(this._axisLeftScale)
        grid
          ? axis.tickSizeInner(-this._innerWidth).tickSizeOuter(-this._innerWidth)
          : null;
        return axis(g);
      })
      .call(g => {
        g.selectAll('text')
          .attr('fill', textColor);
        g.selectAll('line')
          .attr('stroke', tickColor);

        g.selectAll('.tick:last-child line')
          .attr('stroke', lineColor);
        g.selectAll('.tick:first-child line')
          .attr('stroke', lineColor);

        g.selectAll('path')
          .attr('stroke', lineColor);
      })
  }

  addGroup();
  addAxis();
}

export { withAxisLeft }