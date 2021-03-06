import { factory } from '../ccd3-registry/factory.js';
import { Pie } from './Pie/index.js';

/**
 * register all charts with ccd3
 */
factory
  .registerStrategy('pie', Pie)

/**
 * export all charts
 */
export {
  Pie
}