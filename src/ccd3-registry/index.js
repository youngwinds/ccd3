import { factory } from './factory.js';

/**
 * init the chart
 * @param {string} domId dom Id
 * @param {object} chartOption dom's option config
 * @param {object} theme theme config
 */
const init = (domId, chartOption, theme) => {
  return factory.useStrategy(domId, chartOption, theme)
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