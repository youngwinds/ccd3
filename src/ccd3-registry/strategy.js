import { setState } from './setState.js'

/**
 * Manage code with Factory Pattern and Strategy Pattern.
 * Make the use of charts more simple and efficient.
 */
class Strategy {
  constructor(ChartClass) {
    this._Class = ChartClass
  }

  /**
   * Each chart is initialized in the same way.
   * Based on the same Strategy.
   * @param {string} domId dom Id
   * @param {object} chartOption dom's option
   * @param {object} chartTheme dom's theme config
   */
  init(domId, chartOption, chartTheme) {
    const ChartClass = this._Class;
    const chart = new ChartClass(domId, chartOption, chartTheme);
    return [chart, (data, option, theme) => setState.call(chart, data, option, theme)]
  }
}

export { Strategy }