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

export { setState }