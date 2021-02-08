/**
 * 添加额外的基本属性，用户布局。
 */
function addBasicProperty() {
  this._width = this._container.node().clientWidth;
  this._height = this._container.node().clientHeight;

  this._innerHeight = this._height - this._margin.top - this._margin.bottom;
  this._innerWidth = this._width - this._margin.left - this._margin.right;

  this._viewBox = `0 0 ${this._width} ${this._height}`;
}

export { addBasicProperty }