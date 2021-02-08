function addZoom() {
  this._svg
    .call(
      d3
        .zoom()
        .on('zoom', (event) => {
          this._zoomGroup.attr('transform',
            `translate(${event.transform.x},${event.transform.y}) scale(${event.transform.k})`)
        })
    )
}

export { addZoom }