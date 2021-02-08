import { scaleBand } from './scaleBand.js';
import { scaleLinear } from './scaleLinear.js';

function withAxisBottom() {
  if (!this._option.axisBottom || !this._option.axisBottom.scale || !this._option.axisBottom.scale.name)
    throw new TypeError("[axisBottom] Error!");

  loadScale.call(this);
  loadAxis.call(this);
}

/**
 * Load corresponding scale by name.
 */
function loadScale() {
  const {
    axisBottom: {
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
    if (this._axisBottomGroup)
      return;

    if (this._zoomGroup)
      this._axisBottomGroup = this._zoomGroup.insert('g', `#${this._domId}MainGroup`)
    else
      this._axisBottomGroup = this._svg.insert('g', `#${this._domId}MainGroup`)

    this._axisBottomGroup
      .attr('id', `${this._domId}AxisBottomGroup`)
      .attr('transform', `translate(${this._margin.left},${this._innerHeight + this._margin.top})`)
  }

  const addAxis = () => {
    const {
      axisBottom: {
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

    this._axisBottomGroup
      .transition()
      .duration(duration)
      .ease(ease)
      .call(g => {
        const axis = d3.axisBottom(this._axisBottomScale)
        grid
          ? axis.tickSizeInner(-this._innerHeight).tickSizeOuter(-this._innerHeight)
          : null;
        return axis(g)
      })
      .call(g => {
        g.selectAll('text')
          .attr('fill', textColor);
        g.selectAll('line')
          .attr('stroke', tickColor);

        g.selectAll('path')
          .attr('stroke', lineColor)
      })
  }

  addGroup();
  addAxis();
}

export { withAxisBottom }