import { addTooltipContainer } from './addTooltipContainer.js';
import { addListener } from './addListener.js';

function withTooltip(property, format) {
  addTooltipContainer.call(this);
  // 为每个组，添加监听事件
  addListener.call(this, property, format);
}

export { withTooltip }