function addListener(property, format) {

  this[property]

    .style('cursor', 'pointer')

    .on('mouseover', (e) => {
      this._tooltip.transition().style('display', 'block');
      d3.select(e.target).attr('opacity', '0.75');
    })

    .on('mousemove', (e, d) => {
      let currentX = `${e.offsetX}px`;
      let currentY = `${e.offsetY}px`;
      this._tooltip
        .html(format(d))
        .transition()
        .ease(d3.easeCubic)
        .style('left', currentX)
        .style('top', currentY)
    })

    .on('mouseout', (e) => {
      this._tooltip.transition().style('display', 'none');
      d3.select(e.target).attr('opacity', '1');
    });
}

export { addListener }