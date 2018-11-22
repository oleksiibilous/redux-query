import {
  fromJS,
  getIn,
  Map,
} from 'immutable'

export default (sequence, scope) => (store = {}, props = {}) => {
  const s = fromJS(store)

  return [].concat(sequence).reduce((red, fn) => fn(scope ? getIn(s, scope) : s, props, red), Map()).toJS()
}
