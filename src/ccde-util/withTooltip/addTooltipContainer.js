function addTooltipContainer() {
  const {
    tooltip: {
      pointerEvents = 'none',
      textColor = '#212121',
      backgroundColor = '#ffffffcc',
      boxShadow = '0 3px 14px rgba(0,0,0,0.4)',
      border = ' 1px solid #eee',
      borderRadius = '5px',
      padding = '0.75rem 1rem',
      whiteSpace = 'no-warp',
      zIndex = '3080',
      position = 'absolute'
    }
  } = this._theme;

  if (!this._tooltip)
    this._tooltip = this._container
      .append('div')
      .style('pointer-events', pointerEvents)
      .style('white-space', whiteSpace)
      .style('border-radius', borderRadius)
      .style('color', textColor)
      .style('background-color', backgroundColor)
      .style('border', border)
      .style('box-shadow', boxShadow)
      .style('padding', padding)
      .style('z-index', zIndex)
      .style('position', position)
      .style('top', 0)
      .style('display', 'none')
}

export { addTooltipContainer }