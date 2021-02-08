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

  /**
   * 添加布局需要的配置项属性到图表
   */
  function addOptionProperty() {
    const {
      name,
      layout: { margin, zoom }
    } = this._option;

    this._name = name;
    this._margin = {
      top: margin.top,
      right: margin.right,
      bottom: margin.bottom,
      left: margin.left
    };
    this._zoom = zoom;
  }

  /**
   * 添加一个Div作为图表的基本容器，因此，图表容器与用户提供的图表容器松耦合。
   * tips：主要是用户的容器，可能会加上padding甚至是加上边框或者滚动条。所以必须要让这2个容器松耦。
   */
  function addContainer() {
    this._container = d3.select(`#${this._domId}`)
      .append('div')
      .attr('id', `${this._domId}Container`)
      .classed(`ccd3-chart-container`, true)
      .style('width', '100%')
      .style('height', '100%')
      .style('position', 'relative');
  }

  /**
   * 添加额外的基本属性，用户布局。
   */
  function addBasicProperty() {
    this._width = this._container.node().clientWidth;
    this._height = this._container.node().clientHeight;

    this._innerHeight = this._height - this._margin.top - this._margin.bottom;
    this._innerWidth = this._width - this._margin.left - this._margin.right;

    this._viewBox = `0 0 ${this._width} ${this._height}`;
  }

  /**
   * 添加svg画布，我们约定一个图表仅对应svg。
   */
  function addSvg() {
    this._svg = this._container.append('svg')
      .attr('id', `${this._domId}Svg`)
      .attr('class', this._name)
      .attr('viewBox', this._viewBox);
  }

  function addZoom() {
    this._svg
      .call(
        d3
          .zoom()
          .on('zoom', (event) => {
            this._zoomGroup.attr('transform',
              `translate(${event.transform.x},${event.transform.y}) scale(${event.transform.k})`);
          })
      );
  }

  /**
   * 添加缩放
   */

  function withZoom() {
    const {
      layout: { zoom }
    } = this._option;

    if (zoom) {
      this._zoomGroup = this._svg.append('g')
        .attr('id', `${this._domId}ZoomGroup`)
        .attr('class', `zoom-group`);
      addZoom.call(this);
      return this._zoomGroup.append('g');
    } else {
      return this._svg.append('g');
    }
  }

  /**
   * 将所有图表进行抽象，将图表抽象为主要视图部分与辅助视图部分。
   *
   * 为每一个图表添加一个mainGroup容器，以存放图表的主要部分！
   *
   * 将margin作用到mainGroup容器中，以margin确定实现图表的边距。
   *
   * mainGroup容器内部推荐添加主要的视图。
   *
   * mainGroup容器外部推荐添加图例、坐标轴等非主要的辅助视图。
   */

  function addMain() {

    // 统一图表的缩放在svg与mainGroup之间，以此实现Zoom功能的全图表通用。
    this._mainGroup = withZoom.call(this);

    this._mainGroup.attr('id', `${this._domId}MainGroup`)
      .attr('class', `main-group`)
      .attr('transform', `translate(${this._margin.left},${this._margin.top})`);
  }

  /**
   * 每个图表必须在构造函数中调用withLayout,进行图表容器的布局初始化！
   * 初始化操作仅允许调用一次！
   * @param {string} domId 
   * @param {object} option 
   */
  function withLayout() {
    addOptionProperty.call(this);
    addContainer.call(this);
    addBasicProperty.call(this);
    addSvg.call(this);
    addMain.call(this);
  }

  function scaleBand() {
    this._axisBottomScale = d3.scaleBand();

    const {
      axisBottom: {
        key
      }
    } = this._option;

    this._axisBottomScale
      .domain(this._data.map(d => d[key]))
      .range([0, this._innerHeight]);

    /**
     * the interface for _axisBottomScale
     * @param {string || number} d 
     */
    this._bottomScale = (d) => +this._axisBottomScale(d);

    /**
     * the bandwith for category value
     */
    this._bandwidth = () => this.bandwidth();
  }

  function scaleLinear() {
    this._axisBottomScale = d3.scaleLinear();

    const {
      axisBottom: {
        key
      }
    } = this._option;

    this._axisBottomScale
      .domain([0, d3.max(this._data, d => d[key])])
      .range([0, this._innerHeight]);

    /**
    * the interface for _axisBottomScale
    * @param {string || number} d 
    */
    this._bottomScale = (d) => +this._axisBottomScale(d);
  }

  function withAxisBottom() {
    if (!this._option.axisBottom || !this._option.axisBottom.scale || !this._option.axisBottom.scale.name)
      throw new TypeError("[axisBottom] Error!");

    loadScale.call(this);
    loadAxis.call(this);
  }

  /**
   * Load corresponding scale by name.
   */
  function loadScale() {
    const {
      axisBottom: {
        scale: {
          name
        }
      }
    } = this._option;

    switch (name) {
      case 'scaleBand': {
        scaleBand.call(this);
        break;
      }
      case 'scaleLinear': {
        scaleLinear.call(this);
        break;
      }
      default: {
        throw new Error("Unrecognized scale name");
      }
    }
  }

  /**
   * Load axis
   */
  function loadAxis() {
    const addGroup = () => {
      if (this._axisBottomGroup)
        return;

      if (this._zoomGroup)
        this._axisBottomGroup = this._zoomGroup.insert('g', `#${this._domId}MainGroup`);
      else
        this._axisBottomGroup = this._svg.insert('g', `#${this._domId}MainGroup`);

      this._axisBottomGroup
        .attr('id', `${this._domId}AxisBottomGroup`)
        .attr('class', `axis-bottom-group`)
        .attr('transform', `translate(${this._margin.left},${this._innerHeight + this._margin.top})`);
    };

    const addAxis = () => {
      const {
        axisBottom: {
          transition: { duration, ease }
        }
      } = this._option;

      this._axisBottomGroup
        .transition()
        .duration(duration)
        .ease(ease)
        .call(
          d3.axisBottom(this._axisBottomScale)
            // .tickSizeInner(-this._innerHeight)
            // .tickSizeOuter(-this._innerHeight)
        );
    };

    addGroup();
    addAxis();
  }

  function withAxisLeft() {

  }

  class AlgorithmBar {
    constructor(domId, option) {
      this._domId = domId;
      this._option = option;
      withLayout.call(this, domId, option);
    }

    render() {
      withAxisBottom.call(this);
      withAxisLeft.call(this);
    }
  }

  /**
   * register all charts with ccd3
   */
  factory
    .registerStrategy('algorithmBar', AlgorithmBar);

  exports.AlgorithmBar = AlgorithmBar;
  exports.init = init;
  exports.register = register;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
