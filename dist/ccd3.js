(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ccd3 = global.ccd3 || {}));
}(this, (function (exports) { 'use strict';

  /**
   * based on Observer Pattern.
   * We agreed that the interface to update the view is render().
   * @param {object} data dataset fot the chart
   * @param {object} option option for the chart
   */
  function setState(data, option) {
    // Optional data
    this._data = data ? data : this._data;
    // Optional option
    this._option = option ? option : this._option;
    // Dynamic rendering chart
    this.render();
  }

  /**
   * Manage code with Factory Pattern and Strategy Pattern.
   * Make the use of charts more simple and efficient.
   */
  class Strategy {
    constructor(ChartClass) {
      this._Class = ChartClass;
    }

    /**
     * Each chart is initialized in the same way.
     * Based on the same Strategy.
     * @param {string} domId dom Id
     * @param {object} chartOption dom's option
     */
    init(domId, chartOption) {
      const ChartClass = this._Class;
      const chart = new ChartClass(domId, chartOption);
      return [chart, (data, option) => setState.call(chart, data, option)]
    }
  }

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
          throw new Error(`The [${chartkey}] has been registered.\nPlease change the name and re register.`)
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
          throw new Error("The [name] attribute must be included in option.\n[name] is used to indicate a chart.")

        if (!this._strategies.has(chartUniqueKey))
          throw new Error(`The [${chartUniqueKey}] chart doesn't exist in the chart factory.`)

        return this._strategies.get(chartUniqueKey).init(domId, chartOption);
      } catch (e) {
        console.error(e);
      }
    }
  }

  const factory = new Factory();

  /**
   * init the chart
   * @param {string} domId dom Id
   * @param {object} chartOption dom's option
   */
  const init = (domId, chartOption) => {
    return factory.useStrategy(domId, chartOption)
  };

  /**
   * register a chart with ccd3
   * @param {key} chartKey a unique key for each chart
   * @param {class} chartClass An ES6 compliant class 
   */
  const register = (chartKey, chartClass) => {
    factory.registerStrategy(chartKey, chartClass);
  };

  exports.init = init;
  exports.register = register;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
