function addTooltipContainer() {
  if (!this._tooltip)
    this._tooltip = this._container
      .append('div')
      .classed('ccd3-tooltip', true)
}

export { addTooltipContainer }