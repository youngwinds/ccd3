import { addText } from './addText.js'
import { addSubText } from './addSubText.js'
import { addInfo } from './addInfo.js'
import { withGroup } from '../withGroup/index.js'


function withTitle() {
  if (!this._titleGroup)
    withGroup.call(this, "_titleGroup", 'title-group', 'svg', `translate(0,0)`);

  addText.call(this);
  addSubText.call(this);
  addInfo.call(this);
}

export { withTitle }