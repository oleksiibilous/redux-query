const Immutable = require('immutable')

module.exports = (sequence) => {
  let storePrev
  let propsPrev
  let resultPrev

  let resultNext

  return (store, props, result) => {
    if (
      !Immutable.is(storePrev, store) ||
      propsPrev !== props ||
      !Immutable.is(resultPrev, result)
    ) {
      storePrev = store
      propsPrev = props
      resultPrev = result

      resultNext = []
        .concat(sequence)
        .reduce((red, fn) => fn(store, props, red), result)
    }

    return resultNext
  }
}
