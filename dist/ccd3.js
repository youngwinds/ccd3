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
  function setState(data, option, theme) {
    // Optional data
    this._data = data ? data : this._data;
    // Optional option
    this._option = option ? option : this._option;
    // Optional theme
    this._theme = theme ? theme : this._theme;
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
     * @param {object} chartTheme dom's theme config
     */
    init(domId, chartOption, chartTheme) {
      const ChartClass = this._Class;
      const chart = new ChartClass(domId, chartOption, chartTheme);
      return [chart, (data, option, theme) => setState.call(chart, data, option, theme)]
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
     * @param {object} theme the theme config of chart
     */
    useStrategy(domId, chartOption, theme) {
      try {
        const { name: chartUniqueKey } = chartOption;

        if (typeof chartUniqueKey !== "string")
          throw new Error("The [name] attribute must be included in option.[name] is used to indicate a chart.");

        if (!this._strategies.has(chartUniqueKey))
          throw new Error(`The [${chartUniqueKey}] chart doesn't exist in the chart factory.`);

        return this._strategies.get(chartUniqueKey).init(domId, chartOption, theme);
      } catch (e) {
        console.error(e);
      }
    }
  }

  const factory = new Factory();

  /**
   * init the chart
   * @param {string} domId dom Id
   * @param {object} chartOption dom's option config
   * @param {object} theme theme config
   */
  const init = (domId, chartOption, theme) => {
    return factory.useStrategy(domId, chartOption, theme)
  };

  /**
   * register a chart with ccd3
   * @param {key} chartKey a unique key for each chart
   * @param {class} chartClass An ES6 compliant class 
   */
  const register = (chartKey, chartClass) => {
    factory.registerStrategy(chartKey, chartClass);
  };

  function scaleBand() {
    this._axisBottomScale = d3.scaleBand();

    const {
      axisBottom: {
        key,
        scale: {
          reverse = false,
          paddingInner = 0.5,
          paddingOuter = 0.5,
        }
      }
    } = this._option;

    this._axisBottomScale
      .domain(this._data.map(d => d[key]))
      .range(reverse ? [this._innerWidth, 0] : [0, this._innerWidth])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    /**
     * the interface for _axisBottomScale
     * @param {string || number} d 
     */
    this._bottomScale = (d) => +this._axisBottomScale(d);

    /**
     * the bandwith for category value
     */
    this._bandwidth = () => this._axisBottomScale.bandwidth();
  }

  function scaleLinear() {
    this._axisBottomScale = d3.scaleLinear();

    const {
      axisBottom: {
        key,
        scale: {
          extent = false,
          reverse = false,
          nice = true
        }
      }
    } = this._option;

    this._axisBottomScale
      .domain(extent ? d3.extent(this._data, d => d[key]) : [0, d3.max(this._data, d => d[key])])
      .range(reverse ? [this._innerWidth, 0] : [0, this._innerWidth]);
    nice ? this._axisBottomScale.nice() : null;
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
        .attr('transform', `translate(${this._margin.left},${this._innerHeight + this._margin.top})`);
    };

    const addAxis = () => {
      const {
        axisBottom: {
          grid = false,
          transition: { duration, ease }
        }
      } = this._option;

      const {
        axisBottom: {
          tickColor = '#ccc',
          textColor = '#999',
          lineColor = '#ccc'
        }
      } = this._theme;

      this._axisBottomGroup
        .transition()
        .duration(duration)
        .ease(ease)
        .call(g => {
          const axis = d3.axisBottom(this._axisBottomScale);
          grid
            ? axis.tickSizeInner(-this._innerHeight).tickSizeOuter(-this._innerHeight)
            : null;
          return axis(g)
        })
        .call(g => {
          g.selectAll('text')
            .attr('fill', textColor);
          g.selectAll('line')
            .attr('stroke', tickColor);

          g.selectAll('path')
            .attr('stroke', lineColor);
        });
    };

    addGroup();
    addAxis();
  }

  function scaleBand$1() {
    this._axisLeftScale = d3.scaleBand();

    const {
      axisLeft: {
        key,
        scale: {
          reverse = false,
          paddingInner = 0.5,
          paddingOuter = 0.5,
        }
      }
    } = this._option;

    this._axisLeftScale
      .domain(this._data.map(d => d[key]))
      .range(reverse ? [0, this._innerHeight] : [this._innerHeight, 0])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    /**
     * the interface for _axisLeftScale
     * @param {string || number} d 
     */
    this._leftScale = (d) => +this._axisLeftScale(d);

    /**
     * the bandwith for category value
     */
    this._bandwidth = () => this._axisLeftScale.bandwidth();
  }

  function scaleLinear$1() {
    this._axisLeftScale = d3.scaleLinear();

    const {
      axisLeft: {
        key,
        scale: {
          extent = false,
          reverse = false,
          nice = true,
        }
      }
    } = this._option;

    this._axisLeftScale
      .domain(extent ? d3.extent(this._data, d => d[key]) : [0, d3.max(this._data, d => d[key])])
      .range(reverse ? [0, this._innerHeight] : [this._innerHeight, 0]);
    nice ? this._axisLeftScale.nice() : null;
    /**
    * the interface for _axisLeftScale
    * @param {string || number} d 
    */
    this._leftScale = (d) => +this._axisLeftScale(d);
  }

  function withAxisLeft() {
    if (!this._option.axisLeft || !this._option.axisLeft.scale || !this._option.axisLeft.scale.name)
      throw new TypeError("[axisLeft] Error!");

    loadScale$1.call(this);
    loadAxis$1.call(this);
  }

  /**
   * Load corresponding scale by name.
   */
  function loadScale$1() {
    const {
      axisLeft: {
        scale: {
          name
        }
      }
    } = this._option;

    switch (name) {
      case 'scaleBand': {
        scaleBand$1.call(this);
        break;
      }
      case 'scaleLinear': {
        scaleLinear$1.call(this);
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
  function loadAxis$1() {
    const addGroup = () => {
      if (this._axisLeftGroup)
        return;

      if (this._zoomGroup)
        this._axisLeftGroup = this._zoomGroup.insert('g', `#${this._domId}MainGroup`);
      else
        this._axisLeftGroup = this._svg.insert('g', `#${this._domId}MainGroup`);

      this._axisLeftGroup
        .attr('id', `${this._domId}axisLeftGroup`)
        .attr('class', `axis-bottom-group`)
        .attr('transform', `translate(${this._margin.left},${this._margin.top})`);
    };

    const addAxis = () => {
      const {
        axisLeft: {
          grid = false,
          transition: { duration, ease }
        }
      } = this._option;

      const {
        axisBottom: {
          tickColor = '#ccc',
          textColor = '#999',
          lineColor = '#ccc'
        }
      } = this._theme;

      this._axisLeftGroup
        .transition()
        .duration(duration)
        .ease(ease)
        .call(g => {
          const axis = d3.axisLeft(this._axisLeftScale);
          grid
            ? axis.tickSizeInner(-this._innerWidth).tickSizeOuter(-this._innerWidth)
            : null;
          return axis(g);
        })
        .call(g => {
          g.selectAll('text')
            .attr('fill', textColor);
          g.selectAll('line')
            .attr('stroke', tickColor);

          g.selectAll('.tick:last-child line')
            .attr('stroke', lineColor);
          g.selectAll('.tick:first-child line')
            .attr('stroke', lineColor);

          g.selectAll('path')
            .attr('stroke', lineColor);
        });
    };

    addGroup();
    addAxis();
  }

  /**
   * 基于父容器添加新的group，并为其设置类名、和transform。
   * 现在组的规模较小，
   * 如果规模持续扩大，
   * 那么未来考虑进行代码优化，
   * @param {string} propertyName 属性名称
   * @param {string} className 样式类名
   * @param {string} parentGroupName 待添加到的父容器名称（个人自定义）
   * @param {string} translate transofrm样式
   */

  function withGroup(propertyName, className, parentGroupName, translate) {

    if (typeof this[propertyName] !== "undefined")
      return null;

    switch (parentGroupName) {
      case 'main': {
        this[propertyName] = addInMainGroup.call(this, className, translate);
        break;
      }    case 'zoom': {
        this[propertyName] = addInZoomGroup.call(this, className, translate);
        break;
      }    case 'svg': {
        this[propertyName] = addInSvgGroup.call(this, className, translate);
        break;
      }    default: {
        this[propertyName] = addInMainGroup.call(this, className, translate);
        break;
      }  }
    return null;
  }


  function addInMainGroup(className, translate) {
    return this._mainGroup
      .append('g')
      .classed(className, true)
      .attr('transform', translate)
  }

  function addInZoomGroup(className, translate) {
    return this._zoomGroup
      .append('g')
      .classed(className, true)
      .attr('transform', translate)
  }

  function addInSvgGroup(className, translate) {
    return this._svg
      .append('g')
      .classed(className, true)
      .attr('transform', translate)
  }

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
    const {
      layout: {
        backgroundColor ='red',
        color = '#212121'
      }
    } = this._theme;

    this._container = d3.select(`#${this._domId}`)
      .append('div')
      .attr('id', `${this._domId}Container`)
      .style('background-color', backgroundColor)
      .style('color', color)
      .style('position', 'relative')
      .style('width', '100%')
      .style('height', '100%');
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
    this._svg = this._container
      .append('svg')
      .attr('id', `${this._domId}Svg`)
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
      layout: { zoom = false }
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

  /**
   * 添加主标题
   */
  function addText() {
    const {
      title: { text }
    } = this._option;

    const {
      title: {
        transition: {
          duration, ease
        }
      }
    } = this._option;

    const {
      title: {
        textStyle: {
          x = '0',
          y = '0',
          color = '#516b91',
          fontSize = '1.5em',
          fontWeight = '700'
        }
      }
    } = this._theme;

    this._titleGroup
      .selectAll(".title")
      .data([text])
      .join(enter => enter
        .append('text')
        .attr('class', 'title')
        .attr('dy', '1em')
        .attr('x', x)
        .attr('y', y)
        .style('fill', color)
        .style('font-size', fontSize)
        .style('font-weight', fontWeight)
        ,
        update => update
          .transition()
          .duration(duration)
          .ease(ease)
          .attr('class', 'title')
          .attr('dy', '1em')
          .attr('x', x)
          .attr('y', y)
          .style('fill', color)
          .style('font-size', fontSize)
          .style('font-weight', fontWeight)
          .selection()
        ,
        exit => exit.remove()
      )
      .html(d => d);

  }

  /**
   * 添加副标题
   */
  function addSubText() {
    const {
      title: { subText }
    } = this._option;

    const {
      title: {
        subTextStyle: {
          x = '0',
          y = '0',
          color = '#516b91',
          fontSize = '1.5em',
          fontWeight = '700'
        }
      }
    } = this._theme;

    this._titleGroup
      .selectAll(".sub-title")
      .data([subText])
      .join(enter => enter
        .append('text')
        .attr('class', 'sub-title')
        .attr('dy', '3em')
        .attr('x', x)
        .attr('y', y)
        .style('fill', color)
        .style('font-size', fontSize)
        .style('font-weight', fontWeight),
        update => update
          .transition()
          .attr('class', 'sub-title')
          .attr('dy', '3em')
          .attr('x', x)
          .attr('y', y)
          .style('fill', color)
          .style('font-size', fontSize)
          .style('font-weight', fontWeight)
          .selection(),
        exit => exit.remove()
      )

      .html(d => d);

  }

  /**
   * 添加标题提示信息
   */
  function addInfo() {

  }

  function withTitle() {
    if (!this._titleGroup)
      withGroup.call(this, "_titleGroup", 'title-group', 'svg', `translate(0,0)`);

    addText.call(this);
    addSubText.call(this);
    addInfo.call(this);
  }

  function addTooltipContainer() {
    const {
      tooltip: {
        pointerEvents = 'none',
        textColor = '#212121',
        backgroundColor = '#ffffffcc',
        boxShadow = '0 3px 14px rgba(0,0,0,0.4)',
        border = ' 1px solid #eee',
        borderRadius = '5px',
        padding = '0.75rem 1rem',
        whiteSpace = 'no-warp',
        zIndex = '3080',
        position = 'absolute'
      }
    } = this._theme;

    if (!this._tooltip)
      this._tooltip = this._container
        .append('div')
        .style('pointer-events', pointerEvents)
        .style('white-space', whiteSpace)
        .style('border-radius', borderRadius)
        .style('color', textColor)
        .style('background-color', backgroundColor)
        .style('border', border)
        .style('box-shadow', boxShadow)
        .style('padding', padding)
        .style('z-index', zIndex)
        .style('position', position)
        .style('top', 0)
        .style('display', 'none');
  }

  function addListener(property, format) {

    const {
      tooltip: {
        transition: { duration, ease }
      }
    } = this._option;

    this[property]
      .style('cursor', 'pointer')
      .on('mouseover', (e) => {
        this._tooltip.transition().style('display', 'block');
        d3.select(e.target).attr('opacity', '0.75');
      })
      .on('mousemove', (e, d) => {
        let currentX = `${e.offsetX}px`;
        let currentY = `${e.offsetY}px`;
        this._tooltip
          .html(format(e, d))
          .transition()
          .duration(duration)
          .ease(ease)
          .style('left', currentX)
          .style('top', currentY);
      })
      .on('mouseout', (e) => {
        this._tooltip.transition().style('display', 'none');
        d3.select(e.target).attr('opacity', '1');
      });
  }

  function withTooltip(property, format) {
    addTooltipContainer.call(this);
    // 为每个组，添加监听事件
    addListener.call(this, property, format);
  }

  const lightBlue = {
    name: 'lightBlue',
    primary1: '#93b7e3',
    primary2: '#59c4e6',
    primary3: '#edafda',
    primary4: '#516b91',
    primary5: '#a5e7f0',
    primary6: '#cbb0e3',
    colorSets: ['#93b7e3', ' #59c4e6', '#edafda', ' #516b91', '#a5e7f0', ' #cbb0e3', ' #3fb1e3', ' #6be6c1', ' #626c91', '#a0a7e6', '#c4ebad', '#96dee8'],
    layout: {
      backgroundColor: '#fff',
      textColor: '#212121',
      labelColor: '#eee',
    },
    title: {
      textStyle: {
        x: '0',
        y: '0',
        color: '#516b91',
        fontSize: '1.5em',
        fontWeight: '700'
      },
      subTextStyle: {
        x: '0',
        y: '0',
        color: '#93b7e3',
        fontSize: '1em',
        fontWeight: '400'
      },
    },
    axisBottom: {
      tickColor: '#eee',
      lineColor: '#ccc',
      textColor: '#999',
    },
    axisLeft: {
      lineColor: '#ccc',
      textColor: '#999',
    },
    tooltip: {
      pointerEvents: 'none',
      textColor: '#212121',
      backgroundColor: '#ffffffcc',
      boxShadow: '0 3px 14px rgba(0,0,0,0.4)',
      border: ' 1px solid #eee',
      borderRadius: '5px',
      padding: '0.75rem 1rem',
      whiteSpace: 'no-warp',
      zIndex: '3080',
      position: 'absolute',
    }
  };

  class AlgorithmBar {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withAxisBottom.call(this);
      withAxisLeft.call(this);
      withTitle.call(this);
      withGroup.call(this, '_rectGroup', 'rect-group', 'main');

      this.renderColorScale();
      this.renderRect();
    }

    renderColorScale() {
      const {
        algorithmBar: { state }
      } = this._option;

      this._colorScale = d3.scaleOrdinal()
        .domain(Object.keys(state))
        .range(Object.values(state));
    }

    renderRect() {
      const {
        algorithmBar: {
          uniqueKey,
          stateKey,
          animation: { duration, ease },
          on: { click },
        },
        axisBottom: {
          key: xKey,
        },
        axisLeft: { key: yKey },
        tooltip: { format }
      } = this._option;

      this._rectElements = this._rectGroup
        .selectAll('rect')
        .data(this._data, uniqueKey ? d => d[uniqueKey] : uniqueKey)
        .join(
          enter => enter.append('rect')
            .attr('width', this._bandwidth())
            .attr('y', this._innerHeight)
            .attr('x', d => this._bottomScale(d[xKey])),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('height', d => this._innerHeight - this._leftScale(d[yKey]))
        .attr('y', d => this._leftScale(d[yKey]))
        .attr('x', d => this._bottomScale(d[xKey]))
        .attr('fill', d => this._colorScale(d[stateKey]))
        .selection()
        .on('click', (e, d) => click(e, d, this._data));

      withTooltip.call(this, '_rectElements', format);
    }
  }

  class AlgorithmTree {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withTitle.call(this);
      withGroup.call(this, '_pathGroup', 'path-group', 'main');
      withGroup.call(this, '_nodeGroup', 'node-group', 'main');
      withGroup.call(this, '_textGroup', 'text-group', 'main');

      this.renderColorScale();
      this.renderData();
      this.renderScale();
      this.renderPath();
      this.renderNode();
      this.renderText();
    }

    renderColorScale() {
      const {
        algorithmTree: { state }
      } = this._option;

      this._colorScale = d3.scaleOrdinal()
        .domain(Object.keys(state))
        .range(Object.values(state));
    }

    renderData() {
      const {
        algorithmTree: { valueKey, childrenKey },
      } = this._option;

      const root = d3.hierarchy(this._data, d => d[childrenKey]);

      this._rootData = d3.tree()
        .size([this._innerWidth, this._innerHeight])
        // .separation((a, b) => a.parent == b.parent ? 1 : 2)
        (root);
    }

    renderScale() {
      const {
        algorithmTree: {
          valueKey,
          node: { radiusExtent }
        }
      } = this._option;

      let max = -Infinity, min = Infinity;
      const dfs = (node) => {
        if (!node) return;
        max = Math.max(max, node[valueKey]);
        min = Math.min(min, node[valueKey]);
        node.children
          ? node.children.forEach(d => dfs(d))
          : null;
      };
      dfs(this._data);
      this._valueScale = d3.scaleLinear()
        .domain([min, max])
        .range(radiusExtent);
    }

    renderPath() {
      const {
        algorithmTree: {
          uniqueKey,
          stateKey,
          animation: { duration, ease }
        },
      } = this._option;


      this._pathGroupElements = this._pathGroup
        .selectAll('path')
        .data(this._rootData.links(), d => d.target.data[uniqueKey])
        .join(
          enter => enter.append('path')
            .attr('d', d => {
              return d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)
                ({ source: d.source, target: d.source })
            })

            .selection(),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('stroke', d => this._colorScale(d.target.data[stateKey]))
        .attr('fill', 'none')
        .attr("d", d3.linkVertical()
          .x(d => d.x)
          .y(d => d.y));
    }

    renderNode() {
      const {
        algorithmTree: {
          uniqueKey,
          nodeKey,
          childrenKey,
          valueKey,
          stateKey,
          animation: { duration, ease },
        },
        tooltip: { format }
      } = this._option;

      this._nodeGroupElements = this._nodeGroup
        .selectAll('circle')
        .data(this._rootData.descendants(), d => d.data[uniqueKey])
        .join(
          enter => enter.append('circle')
            .attr("transform", d => `translate(${d.x}, ${d.y})`),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('fill', d => this._colorScale(d.data[stateKey]))
        .attr('r', d => this._valueScale(d.data[valueKey]))
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .selection()
        .style('cursor', 'pointer')
        .classed('subtree-hidden', d => d.data[`_${childrenKey}`] ? true : false)
        .classed('leaf-node', d => d.data[childrenKey] ? false : true);

      withTooltip.call(this, '_nodeGroupElements', format ? format : (e, d) => {
        return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
      });
    }

    renderText() {
      const {
        algorithmTree: {
          nodeKey,
          valueKey,
          uniqueKey,
          animation: { duration, ease },
        },
        tooltip: { format }
      } = this._option;

      this._textGroupElements = this._textGroup
        .selectAll('text')
        .data(this._rootData.descendants(), d => d.data[uniqueKey])
        .join(
          enter => enter.append('text')
            .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(90)`),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('font-size', d => this._valueScale(d.data[valueKey]))
        .attr('dy', '0.31em')
        .attr('dx', '10')
        .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(90)`)
        .attr("dx", d => d.children ? '-1em' : '1em')
        .attr("text-anchor", d => d.children ? "end" : "start")
        .selection()
        .html(d => d.data[nodeKey])
        .style('cursor', 'pointer');

      withTooltip.call(this, '_textGroupElements', format ? format : (e, d) => {
        return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
      });
    }
  }

  /**
   * register all charts with ccd3
   */
  factory
    .registerStrategy('algorithmBar', AlgorithmBar)
    .registerStrategy('algorithmTree', AlgorithmTree);

  class HorizontalBar {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withAxisBottom.call(this);
      withAxisLeft.call(this);
      withTitle.call(this);
      withGroup.call(this, '_rectGroup', 'rect-group', 'main');

      this.renderRect();
    }

    renderRect() {
      const {
        horizontalBar: {
          uniqueKey,
          animation: { duration, ease },
          on: { click },
        },
        axisBottom: {
          key: xKey,
        },
        axisLeft: { key: yKey },
        tooltip: { format }
      } = this._option;

      console.log(xKey);
      const {
        primary1
      } = this._theme;

      this._rectElements = this._rectGroup
        .selectAll('rect')
        .data(this._data, uniqueKey ? d => d[uniqueKey] : uniqueKey)
        .join(
          enter => enter.append('rect')
            .attr('height', this._bandwidth())
            .attr('width', 0)
            .attr('y', d => this._leftScale(d[yKey])),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('height', this._bandwidth())
        .attr('width', d => this._bottomScale(d[xKey]))
        .attr('y', d => this._leftScale(d[yKey]))
        .attr('fill', primary1)
        .selection()
        .on('click', (e, d) => click(e, d, this._data));

      withTooltip.call(this, '_rectElements', format);
    }
  }

  class VerticalBar {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withAxisBottom.call(this);
      withAxisLeft.call(this);
      withTitle.call(this);
      withGroup.call(this, '_rectGroup', 'rect-group', 'main');

      this.renderRect();
    }

    renderRect() {
      const {
        verticalBar: {
          uniqueKey,
          animation: { duration, ease },
          on: { click },
        },
        axisBottom: {
          key: xKey,
        },
        axisLeft: { key: yKey },
        tooltip: { format }
      } = this._option;

      const {
        primary1
      } = this._theme;

      this._rectElements = this._rectGroup
        .selectAll('rect')
        .data(this._data, uniqueKey ? d => d[uniqueKey] : uniqueKey)
        .join(
          enter => enter.append('rect')
            .attr('width', this._bandwidth())
            .attr('y', this._innerHeight)
            .attr('x', d => this._bottomScale(d[xKey])),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('height', d => this._innerHeight - this._leftScale(d[yKey]))
        .attr('y', d => this._leftScale(d[yKey]))
        .attr('x', d => this._bottomScale(d[xKey]))
        .attr('fill', primary1)
        .selection()
        .on('click', (e, d) => click(e, d, this._data));

      withTooltip.call(this, '_rectElements', format);
    }
  }

  /**
   * register all charts with ccd3
   */
  factory
    .registerStrategy('horizontalBar', HorizontalBar)
    .registerStrategy('verticalBar', VerticalBar);

  class Pie {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withTitle.call(this);

      withGroup.call(this, '_pathGroup', 'path-group', 'main', `translate(${this._innerWidth / 2},${this._innerHeight / 2})`);
      withGroup.call(this, '_legendGroup', 'legend-group', 'main', `translate(${this._innerWidth},${0})`);

      this.renderData();
      this.renderScale();
      this.renderPath();
      this.renderLegend();
    }

    renderData() {
      const {
        pie: { categoryKey, valueKey, innerRadius }
      } = this._option;

      this._radius = Math.min(this._innerHeight, this._innerWidth) / 2;

      this._pieData = d3.pie()
        .sort(d => d[categoryKey])
        .value(d => d[valueKey])(this._data);

      this._arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(this._radius);
    }

    renderScale() {
      const {
        pie: { categoryKey },
      } = this._option;

      const {
        colorSets
      } = this._theme;

      if (!this._colorScale)
        this._colorScale = d3.scaleOrdinal()
          .domain(this._data.map(d => d[categoryKey]))
          .range(colorSets);
    }

    renderPath() {
      const {
        pie: {
          uniqueKey,
          categoryKey,
          on: { click },
          animation: { duration, ease }
        },
        tooltip: { format },

      } = this._option;

      this._pathGroupElement = this._pathGroup
        .selectAll('path')
        .data(this._pieData, d => d.data[uniqueKey])
        .join('path')
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('fill', d => this._colorScale(d.data[categoryKey]))
        .attr('d', d => this._arc(d))
        .selection()
        .on('click', (e, d) => click(e, d, this._data));

      withTooltip.call(this, '_pathGroupElement', format);
    }

    renderLegend() {
      this._legendGroupElements = this._legendGroup
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("g")
        .data(this._colorScale.domain())
        .join("g")
        .attr("transform", (d, i) => `translate(0,${i * 20})`);

      this._legendGroupElements
        .selectAll('rect')
        .data(d => [d])
        .join("rect")
        .attr("x", -19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", this._colorScale);

      this._legendGroupElements
        .selectAll('text')
        .data(d => [d])
        .join("text")
        .attr("x", -24)
        .attr("y", 9.5)
        .attr("dy", "0.35em")
        .text(d => d);
    }
  }

  /**
   * register all charts with ccd3
   */
  factory
    .registerStrategy('pie', Pie);

  class HorizontalTree {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withTitle.call(this);
      withGroup.call(this, '_pathGroup', 'path-group', 'main');
      withGroup.call(this, '_nodeGroup', 'node-group', 'main');
      withGroup.call(this, '_textGroup', 'text-group', 'main');

      this.renderData();
      this.renderScale();
      this.renderPath();
      this.renderNode();
      this.renderText();
    }

    renderData() {
      const {
        horizontalTree: { valueKey, childrenKey },
      } = this._option;

      const root = d3.hierarchy(this._data, d => d[childrenKey]);

      this._rootData = d3.tree()
        .size([this._innerHeight, this._innerWidth])
        // .separation((a, b) => a.parent == b.parent ? 1 : 2)
        (root);
    }

    renderScale() {
      const {
        horizontalTree: {
          valueKey,
          node: { radiusExtent }
        }
      } = this._option;

      let max = -Infinity, min = Infinity;
      const dfs = (node) => {
        if (!node) return;
        max = Math.max(max, node[valueKey]);
        min = Math.min(min, node[valueKey]);
        node.children
          ? node.children.forEach(d => dfs(d))
          : null;
      };
      dfs(this._data);
      this._valueScale = d3.scaleLinear()
        .domain([min, max])
        .range(radiusExtent);
    }

    renderPath() {
      const {
        horizontalTree: {
          uniqueKey,
          animation: { duration, ease }
        },

      } = this._option;

      const {
        primary1: lineColor
      } = this._theme;

      this._pathGroupElements = this._pathGroup
        .selectAll('path')
        .data(this._rootData.links(), d => d.target.data[uniqueKey])
        .join(
          enter => enter.append('path')
            .attr('d', d => {
              return d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x)
                ({ source: d.source, target: d.source })
            }),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('stroke', lineColor)
        .attr('fill', 'none')
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));
    }

    renderNode() {
      const {
        horizontalTree: {
          uniqueKey,
          nodeKey,
          childrenKey,
          valueKey,
          animation: { duration, ease },
        },
        tooltip: { format }
      } = this._option;

      const {
        primary4: nodeColor
      } = this._theme;

      this._nodeGroupElements = this._nodeGroup
        .selectAll('circle')
        .data(this._rootData.descendants(), d => d.data[uniqueKey])
        .join(
          enter => enter.append('circle')
            .attr("transform", d => `translate(${d.y}, ${d.x})`),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('fill', nodeColor)
        .attr('r', d => this._valueScale(d.data[valueKey]))
        .attr("transform", d => `translate(${d.y}, ${d.x})`)
        .selection()
        .style('cursor', 'pointer')
        .classed('subtree-hidden', d => d.data[`_${childrenKey}`] ? true : false)
        .classed('leaf-node', d => d.data[childrenKey] ? false : true);

      withTooltip.call(this, '_nodeGroupElements', format ? format : (e, d) => {
        return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
      });
    }

    renderText() {
      const {
        horizontalTree: {
          nodeKey,
          valueKey,
          uniqueKey,
          animation: { duration,ease },
        },
        tooltip: { format }
      } = this._option;

      this._textGroupElements = this._textGroup
        .selectAll('text')
        .data(this._rootData.descendants(), d => d.data[uniqueKey])
        .join(
          enter => enter.append('text')
            .attr('transform', d => `translate(${d.y}, ${d.x}) rotate(90)`),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('transform', d => `translate(${d.y}, ${d.x})`)
        .attr('font-size', d => this._valueScale(d.data[valueKey]))
        .attr("dy", "0.31em")
        .attr("dx", d => d.children ? '-1em' : '1em')
        .attr("text-anchor", d => d.children ? "end" : "start")
        .selection()
        .html(d => d.data[nodeKey])
        .style('cursor', 'pointer');

      withTooltip.call(this, '_textGroupElements', format ? format : (e, d) => {
        return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
      });
    }
  }

  class VerticalTree {
    constructor(domId, option, theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : lightBlue;
      withLayout.call(this, domId, option);
    }

    render() {
      withTitle.call(this);
      withGroup.call(this, '_pathGroup', 'path-group', 'main');
      withGroup.call(this, '_nodeGroup', 'node-group', 'main');
      withGroup.call(this, '_textGroup', 'text-group', 'main');

      this.renderData();
      this.renderScale();
      this.renderPath();
      this.renderNode();
      this.renderText();
    }

    renderData() {
      const {
        verticalTree: { valueKey, childrenKey },
      } = this._option;

      const root = d3.hierarchy(this._data, d => d[childrenKey]);

      this._rootData = d3.tree()
        .size([this._innerWidth, this._innerHeight])
        // .separation((a, b) => a.parent == b.parent ? 1 : 2)
        (root);
    }

    renderScale() {
      const {
        verticalTree: {
          valueKey,
          node: { radiusExtent }
        }
      } = this._option;

      let max = -Infinity, min = Infinity;
      const dfs = (node) => {
        if (!node) return;
        max = Math.max(max, node[valueKey]);
        min = Math.min(min, node[valueKey]);
        node.children
          ? node.children.forEach(d => dfs(d))
          : null;
      };
      dfs(this._data);
      this._valueScale = d3.scaleLinear()
        .domain([min, max])
        .range(radiusExtent);
    }

    renderPath() {
      const {
        verticalTree: {
          uniqueKey,
          animation: { duration, ease }
        },

      } = this._option;

      const {
        primary1: lineColor
      } = this._theme;

      this._pathGroupElements = this._pathGroup
        .selectAll('path')
        .data(this._rootData.links(), d => d.target.data[uniqueKey])
        .join(
          enter => enter.append('path')
            .attr('d', d => {
              return d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)
                ({ source: d.source, target: d.source })
            })
          ,
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('stroke', lineColor)
        .attr('fill', 'none')
        .attr("d", d3.linkVertical()
          .x(d => d.x)
          .y(d => d.y))
        .selection();
    }

    renderNode() {
      const {
        verticalTree: {
          uniqueKey,
          nodeKey,
          childrenKey,
          valueKey,
          animation: { duration, ease },
        },
        tooltip: { format }
      } = this._option;

      const {
        primary4: nodeColor
      } = this._theme;

      this._nodeGroupElements = this._nodeGroup
        .selectAll('circle')
        .data(this._rootData.descendants(), d => d.data[uniqueKey])
        .join(
          enter => enter.append('circle')
            .attr("transform", d => `translate(${d.x}, ${d.y})`),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('fill', nodeColor)
        .attr('r', d => this._valueScale(d.data[valueKey]))
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .selection()
        .style('cursor', 'pointer')
        .classed('subtree-hidden', d => d.data[`_${childrenKey}`] ? true : false)
        .classed('leaf-node', d => d.data[childrenKey] ? false : true);

      withTooltip.call(this, '_nodeGroupElements', format ? format : (e, d) => {
        return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
      });
    }

    renderText() {
      const {
        verticalTree: {
          nodeKey,
          valueKey,
          uniqueKey,
          animation: { duration, ease },
        },
        tooltip: { format }
      } = this._option;

      this._textGroupElements = this._textGroup
        .selectAll('text')
        .data(this._rootData.descendants(), d => d.data[uniqueKey])
        .join(
          enter => enter.append('text')
            .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(90)`),
          update => update,
          exit => exit.remove()
        )
        .transition()
        .duration(duration)
        .ease(ease)
        .attr('font-size', d => this._valueScale(d.data[valueKey]))
        .attr('dy', '0.31em')
        .attr('dx', '10')
        .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(90)`)
        .attr("dx", d => d.children ? '-1em' : '1em')
        .attr("text-anchor", d => d.children ? "end" : "start")
        .selection()
        .html(d => d.data[nodeKey])
        .style('cursor', 'pointer');

      withTooltip.call(this, '_textGroupElements', format ? format : (e, d) => {
        return `${d.ancestors().map(d => d.data[nodeKey]).reverse().join("-><br/>")} : <strong>${d3.format(",d")(d.data[valueKey])} </strong>`;
      });
    }
  }

  /**
   * register all charts with ccd3
   */
  factory
    .registerStrategy('horizontalTree', HorizontalTree)
    .registerStrategy('verticalTree', VerticalTree);

  exports.AlgorithmBar = AlgorithmBar;
  exports.AlgorithmTree = AlgorithmTree;
  exports.HorizontalBar = HorizontalBar;
  exports.HorizontalTree = HorizontalTree;
  exports.Pie = Pie;
  exports.VerticalBar = VerticalBar;
  exports.VerticalTree = VerticalTree;
  exports.init = init;
  exports.register = register;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
