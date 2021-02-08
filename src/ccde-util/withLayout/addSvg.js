/**
 * 添加svg画布，我们约定一个图表仅对应svg。
 */
function addSvg() {
  this._svg = this._container.append('svg')
    .attr('id', `${this._domId}Svg`)
    .attr('class', this._name)
    .attr('viewBox', this._viewBox);
}

export { addSvg }