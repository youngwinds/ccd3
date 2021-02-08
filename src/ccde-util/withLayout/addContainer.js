/**
 * 添加一个Div作为图表的基本容器，因此，图表容器与用户提供的图表容器松耦合。
 * tips：主要是用户的容器，可能会加上padding甚至是加上边框或者滚动条。所以必须要让这2个容器松耦。
 */
function addContainer() {
  this._container = d3.select(`#${this._domId}`)
    .append('div')
    .attr('id', `${this._domId}Container`)
    .classed(`ccd3-chart-container`, true)
    .style('width', '100%')
    .style('height', '100%')
    .style('position', 'relative');
}

export { addContainer }