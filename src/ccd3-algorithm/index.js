import { factory } from '../ccd3-registry/factory.js';
import { AlgorithmBar } from './AlgorithmBar/index.js';

/**
 * register all charts with ccd3
 */
factory
  .registerStrategy('algorithmBar', AlgorithmBar)

/**
 * export all charts
 */
export {
  AlgorithmBar
}