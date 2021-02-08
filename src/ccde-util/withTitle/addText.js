/**
 * 添加主标题
 */
function addText() {
  const {
    title: { text }
  } = this._option;
  this._titleGroup
    .selectAll(".title")
    .data([text])
    .join("text")
    .attr('class', 'title')
    .html(d => d)
    .attr('dy', '1em')
}

export { addText }