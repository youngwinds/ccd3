/**
 * 添加布局需要的配置项属性到图表
 */
function addOptionProperty() {
  const {
    name,
    layout: { margin, zoom }
  } = this._option;

  this._name = name;
  this._margin = {
    top: margin.top,
    right: margin.right,
    bottom: margin.bottom,
    left: margin.left
  };
  this._zoom = zoom;
}

export { addOptionProperty }