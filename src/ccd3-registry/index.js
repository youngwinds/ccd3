import { factory } from './factory.js';

/**
 * init the chart
 * @param {string} domId dom Id
 * @param {object} chartOption dom's option
 */
const init = (domId, chartOption) => {
  return factory.useStrategy(domId, chartOption)
}

/**
 * register a chart with ccd3
 * @param {key} chartKey a unique key for each chart
 * @param {class} chartClass An ES6 compliant class 
 */
const register = (chartKey, chartClass) => {
  factory.registerStrategy(chartKey, chartClass)
}

export {
  init,
  register
}