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

export { setState }