import {
  withLayout,
  withTitle,
  withGroup,
  withTooltip
} from '../../ccde-util/index.js'

import { lightBlue as defaultTheme } from '../../ccd3-theme/lightBlue.js';

class Radar {
  constructor(domId, option,theme) {
      this._domId = domId;
      this._option = option;
      this._theme = theme ? theme : defaultTheme;
      withLayout.call(this, domId, option);
      const {
          radar: { valueKey }
      } = this._option;
      this.arc = 2 * Math.PI;
      this.onePiece = this.arc / valueKey.length;
  }
  render() {
      withTitle.call(this);
      withGroup.call(this, '_polygonGroup', 'polygon-group', 'main', `translate(${this._innerWidth / 2},${this._innerHeight / 2})`);
      withGroup.call(this, '_lineGroup', 'line-group', 'main', `translate(${this._innerWidth / 2},${this._innerHeight / 2})`);
      withGroup.call(this, '_areaGroup', 'area-group', 'main', `translate(${this._innerWidth / 2},${this._innerHeight / 2})`);
      withGroup.call(this, '_textGroup', 'text-group', 'main', `translate(${this._innerWidth / 2},${this._innerHeight / 2})`);

      this.renderScale();
      this.renderAxes();
      this.renderArea();
      this.renderText();
  }
  renderScale() {
      const { radius } = this._option;
      this.scale = d3
          .scaleLinear()
          .domain([0, 100])
          .range([0, radius]);
  }

  renderAxes() {
      this.renderWebData();
      this.renderWeb();
      this.renderWebText();
  }
  renderWeb() {
      const {
          style: { axisStrokeColor }
      } = this._option;
      this._lineGroup.selectAll("line")
          .data(this.polygons.webPoints[0])
          .join("line")
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', d => d.x)
          .attr('y2', d => d.y)
          .attr("stroke", axisStrokeColor)
          .attr("stroke-dasharray", 10, 5);
      this._polygonGroup
          .selectAll('polygon')
          .data(this.polygons.webs)
          .join('polygon')
          .attr('points', d => d)
          .attr("fill", 'white')
          .attr("fill-opacity", 0.5)
          .attr("stroke", axisStrokeColor)
          .attr("stroke-dasharray", 10, 5);
  }
  renderWebData() {
      const {
          radar: { radius, level, valueKey }
      } = this._option;
      this.polygons = {
          webs: [],
          webPoints: []
      };
      for (let k = level; k > 0; k--) {
          let webs = '',
              webPoints = [];
          let r = radius / level * k;
          for (let i = 0; i < valueKey.length; i++) {
              let x = r * Math.sin(i * this.onePiece),
                  y = r * Math.cos(i * this.onePiece);
              webs += x + ',' + y + ' ';
              webPoints.push({
                  x: x,
                  y: y
              });
          }
          this.polygons.webs.push(webs);
          this.polygons.webPoints.push(webPoints);
      }
  } 
  renderWebText() {
      const {
          radar: { level, maxValue, radius },
          style: { axisTextColor }
      } = this._option;
      let arr = [];
      for (let j = 0; j <= level; j++) {
          arr.push(maxValue / level * j)
      }
      this._polygonGroup.selectAll("text")
          .data(arr)
          .join("text")
          .attr("x", 0)
          .attr("y", function (d, i) { return (radius / level) * i * -1 })
          .attr("class", "legend")
          .style("font-family", "sans-serif")
          .style("font-size", "10px")
          .attr("fill", axisTextColor)
          .text(d => d.toFixed(2));
  }

  renderArea() {
      this.renderAreaData();
      this.renderAreaChart();
  }
  renderAreaData() {
      const {
          radar: {
              radius, rangeMax, rangeMin, categoryKey, valueKey, level
          }
      } = this._option;
      this.areasData = [];
      let value = this._data[0],
          area = '',
          points = [];
      for (let k = 0; k < valueKey.length; k++) {
          let r = radius * (value[valueKey[k]] - rangeMin) / (rangeMax - rangeMin);
          let x = r * Math.sin(k * this.onePiece),
              y = r * Math.cos(k * this.onePiece);
          area += x + ',' + y + ' ';
          points.push({
              x: x,
              y: y
          })
      }
      this.areasData.push({
          polygon: area,
          points: points
      });
  }
  renderAreaChart() {
      this.areas = this._areaGroup//添加g分组用来包含一个雷达图区域下的多边形以及圆点 
          .selectAll('g')
          .data(this.areasData)
          .join('g')
          .attr('id', (d, i) => {
              return 'area' + (i + 1);
          });
      for (let i = 0; i < this.areasData.length; i++) {
          // 依次循环每个雷达图区域
          let area = d3.select('#area' + (i + 1)), 
          areaData = this.areasData[i];
          // 绘制雷达图区域下的多边形
          area.append('polygon')
              .attr('points', areaData.polygon)
              .attr('stroke', this.getColor(i))
              .attr('fill', this.getColor(i))
              .attr("fill-opacity", 0.5)
              .attr("stroke-width", 1)
              ;
          // 绘制雷达图区域下的点 
          let circles = area.append('g')
              .classed('circles', true);
          circles.selectAll('circle')
              .data(areaData.points)
              .join('circle')
              .attr('cx', d => d.x)
              .attr('cy', d => d.y)
              .attr('r', 3)
              .attr('stroke', this.getColor(i))
              .attr('fill', this.getColor(i + 1));
      }
  }
  
  renderText() {
      const {
          radar: { radius, valueKey}
      } = this._option;
      // 计算文字标签坐标
      let textPoints = [];
      let textRadius = radius + 30;
      for (let i = 0; i < valueKey.length; i++) {
          let x = textRadius * Math.sin(i * this.onePiece),
              y = textRadius * Math.cos(i * this.onePiece);
          textPoints.push({
              x: x - 30,
              y: y + 5
          });
      }
      this._textGroup.selectAll('text')
          .data(textPoints)
          .join('text')
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .attr("stroke", "#516b91")
          .text((d, i) => { valueKey[i] });
  }
  getColor = (idx) => {
      const {
          style: { colorSets }
      } = this._option;
      return colorSets[idx % colorSets.length];
  }
}
export { Radar }