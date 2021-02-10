import { factory } from '../ccd3-registry/factory.js';
import { AlgorithmBar } from './AlgorithmBar/index.js';
import { AlgorithmTree } from './AlgorithmTree/index.js';

/**
 * register all charts with ccd3
 */
factory
  .registerStrategy('algorithmBar', AlgorithmBar)
  .registerStrategy('algorithmTree', AlgorithmTree)

/**
 * export all charts
 */
export {
  AlgorithmBar,
  AlgorithmTree
}