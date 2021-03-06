/**
 * 添加主标题
 */
function addText() {
  const {
    title: { text }
  } = this._option;

  const {
    title: {
      transition: {
        duration, ease
      }
    }
  } = this._option;

  const {
    title: {
      textStyle: {
        x = '0',
        y = '0',
        color = '#516b91',
        fontSize = '1.5em',
        fontWeight = '700'
      }
    }
  } = this._theme;

  this._titleGroup
    .selectAll(".title")
    .data([text])
    .join(enter => enter
      .append('text')
      .attr('class', 'title')
      .attr('dy', '1em')
      .attr('x', x)
      .attr('y', y)
      .style('fill', color)
      .style('font-size', fontSize)
      .style('font-weight', fontWeight)
      ,
      update => update
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('class', 'title')
        .attr('dy', '1em')
        .attr('x', x)
        .attr('y', y)
        .style('fill', color)
        .style('font-size', fontSize)
        .style('font-weight', fontWeight)
        .selection()
      ,
      exit => exit.remove()
    )
    .html(d => d)

}

export { addText }