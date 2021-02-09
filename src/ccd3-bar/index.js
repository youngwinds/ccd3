import { factory } from '../ccd3-registry/factory.js';
import { HorizontalBar } from './HorizontalBar/index.js';
import { VerticalBar } from './VerticalBar/index.js';

/**
 * register all charts with ccd3
 */
factory
  .registerStrategy('horizontalBar', HorizontalBar)
  .registerStrategy('verticalBar', VerticalBar)

/**
 * export all charts
 */
export {
  HorizontalBar,
  VerticalBar
}