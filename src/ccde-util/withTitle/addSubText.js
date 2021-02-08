/**
 * 添加副标题
 */
function addSubText() {
  const {
    title: { subText }
  } = this._option;

  this._titleGroup
    .selectAll(".sub-title")
    .data([subText])
    .join("text")
    .attr('class', 'sub-title')
    .html(d => d)
    .attr('dy', '3em')
}

export { addSubText }