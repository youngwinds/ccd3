import { Strategy } from './strategy.js'

class Factory {
  constructor() {
    this._strategies = new Map();
  }

  /**
   * register a chart with ccd3
   * @param {key} chartKey a unique key for each chart
   * @param {class} chartClass An ES6 compliant class 
   */
  registerStrategy(chartKey, ChartClass) {
    try {
      if (this._strategies.has(chartKey))
        throw new Error(`The [${chartkey}] has been registered.Please change the name and re register.`);
      this._strategies.set(chartKey, new Strategy(ChartClass));
      return this;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * use chart
   * @param {string} domId the dom'id of a chart container
   * @param {object} chartOption the option of chart
   */
  useStrategy(domId, chartOption) {
    try {
      const { name: chartUniqueKey } = chartOption;

      if (typeof chartUniqueKey !== "string")
        throw new Error("The [name] attribute must be included in option.[name] is used to indicate a chart.");

      if (!this._strategies.has(chartUniqueKey))
        throw new Error(`The [${chartUniqueKey}] chart doesn't exist in the chart factory.`);

      return this._strategies.get(chartUniqueKey).init(domId, chartOption);
    } catch (e) {
      console.error(e);
    }
  }
}

const factory = new Factory();

export {
  factory
}