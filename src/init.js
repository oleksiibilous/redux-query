import {
  fromJS,
  getIn,
  is,
  Map,
} from 'immutable'
import hash from 'object-hash'

export default (sequence, scope) => {
  let results
  let storePrev

  return (store = {}, props = {}) => {
    const s = fromJS(store)

    const storeNext = scope ? getIn(s, scope) : s
    const checksum = hash(props)

    if (!is(storePrev, storeNext)) {
      storePrev = storeNext
      results = {}
    } else if (results.hasOwnProperty(checksum)) return results[checksum]

    const result = [].concat(sequence).reduce((red, fn) => fn(storeNext, props, red), Map()).toJS()

    results[checksum] = result

    return result
  }
}
