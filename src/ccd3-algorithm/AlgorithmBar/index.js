import { withLayout } from '../../ccde-util/withLayout/index.js';
import { withAxisBottom } from '../../ccde-util/withAxisBottom/index.js';
import { withAxisLeft } from '../../ccde-util/withAxisLeft/index.js';

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

export { AlgorithmBar }