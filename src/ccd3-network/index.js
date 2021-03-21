import { factory } from '../ccd3-registry/factory.js';
import { ForceDirected } from './ForceDirected/index.js'

/**
 * register all charts with ccd3
 */
factory
  .registerStrategy('forceDirected', ForceDirected)

/**
 * export all charts
 */
export {
  ForceDirected,
}