/**
 * 添加主标题
 */
function addText() {
  const {
    title: { text }
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
    .join("text")
    .html(d => d)
    .attr('dy', '1em')
    .attr('x', x)
    .attr('y', y)
    .style('fill', color)
    .style('font-size', fontSize)
    .style('font-weight', fontWeight);
}

export { addText }