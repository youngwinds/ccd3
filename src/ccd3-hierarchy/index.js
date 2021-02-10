import { factory } from '../ccd3-registry/factory.js';
import { HorizontalTree } from './HorizontalTree/index.js'
import { VerticalTree } from './VerticalTree/index.js'

/**
 * register all charts with ccd3
 */
factory
  .registerStrategy('horizontalTree', HorizontalTree)
  .registerStrategy('verticalTree', VerticalTree)

/**
 * export all charts
 */
export {
  HorizontalTree,
  VerticalTree
}