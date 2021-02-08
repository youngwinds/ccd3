/**
 * 将所有图表进行抽象，将图表抽象为主要视图部分与辅助视图部分。
 *
 * 为每一个图表添加一个mainGroup容器，以存放图表的主要部分！
 *
 * 将margin作用到mainGroup容器中，以margin确定实现图表的边距。
 *
 * mainGroup容器内部推荐添加主要的视图。
 *
 * mainGroup容器外部推荐添加图例、坐标轴等非主要的辅助视图。
 */

import { withZoom } from './withZoom/index.js'

function addMain() {

  // 统一图表的缩放在svg与mainGroup之间，以此实现Zoom功能的全图表通用。
  this._mainGroup = withZoom.call(this);

  this._mainGroup.attr('id', `${this._domId}MainGroup`)
    .attr('class', `main-group`)
    .attr('transform', `translate(${this._margin.left},${this._margin.top})`)
}

export { addMain }