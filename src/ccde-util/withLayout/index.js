import { addOptionProperty } from './addOptionProperty.js'
import { addContainer } from './addContainer.js'
import { addBasicProperty } from './addBasicProperty.js'
import { addSvg } from './addSvg.js'
import { addMain } from './addMain.js'

/**
 * 每个图表必须在构造函数中调用withLayout,进行图表容器的布局初始化！
 * 初始化操作仅允许调用一次！
 * @param {string} domId 
 * @param {object} option 
 */
function withLayout() {
  addOptionProperty.call(this);
  addContainer.call(this);
  addBasicProperty.call(this);
  addSvg.call(this);
  addMain.call(this);
}

export { withLayout }