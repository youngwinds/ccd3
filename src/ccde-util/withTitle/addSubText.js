/**
 * 添加副标题
 */
function addSubText() {
  const {
    title: { subText }
  } = this._option;

  const {
    title: {
      subTextStyle: {
        x = '0',
        y = '0',
        color = '#516b91',
        fontSize = '1.5em',
        fontWeight = '700'
      }
    }
  } = this._theme;

  this._titleGroup
    .selectAll(".sub-title")
    .data([subText])
    .join(enter => enter
      .append('text')
      .attr('class', 'sub-title')
      .attr('dy', '3em')
      .attr('x', x)
      .attr('y', y)
      .style('fill', color)
      .style('font-size', fontSize)
      .style('font-weight', fontWeight),
      update => update
        .transition()
        .attr('class', 'sub-title')
        .attr('dy', '3em')
        .attr('x', x)
        .attr('y', y)
        .style('fill', color)
        .style('font-size', fontSize)
        .style('font-weight', fontWeight)
        .selection(),
      exit => exit.remove()
    )

    .html(d => d)

}

export { addSubText }