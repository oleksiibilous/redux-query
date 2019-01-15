const Immutable = require('immutable')

module.exports = (sequence, scope) => (store = {}, props = {}) => {
  const s = Immutable.fromJS(store)

  return []
    .concat(sequence)
    .reduce(
      (red, fn) => fn(scope ? Immutable.getIn(s, scope) : s, props, red),
      Immutable.Map()
    )
    .toJS()
}
