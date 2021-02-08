/**
 * 基于父容器添加新的group，并为其设置类名、和transform。
 * 现在组的规模较小，
 * 如果规模持续扩大，
 * 那么未来考虑进行代码优化，
 * @param {string} propertyName 属性名称
 * @param {string} className 样式类名
 * @param {string} parentGroupName 待添加到的父容器名称（个人自定义）
 * @param {string} translate transofrm样式
 */

function withGroup(propertyName, className, parentGroupName, translate) {

  if (typeof this[propertyName] !== "undefined")
    return null;

  switch (parentGroupName) {
    case 'main': {
      this[propertyName] = addInMainGroup.call(this, className, translate);
      break;
    };
    case 'zoom': {
      this[propertyName] = addInZoomGroup.call(this, className, translate);
      break;
    };
    case 'svg': {
      this[propertyName] = addInSvgGroup.call(this, className, translate);
      break;
    };
    default: {
      this[propertyName] = addInMainGroup.call(this, className, translate);
      break;
    };
  }
  return null;
}


function addInMainGroup(className, translate) {
  return this._mainGroup
    .append('g')
    .classed(className, true)
    .attr('transform', translate)
}

function addInZoomGroup(className, translate) {
  return this._zoomGroup
    .append('g')
    .classed(className, true)
    .attr('transform', translate)
}

function addInSvgGroup(className, translate) {
  return this._svg
    .append('g')
    .classed(className, true)
    .attr('transform', translate)
}


export { withGroup }