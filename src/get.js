const Immutable = require('immutable')

module.exports = (key, val, initial = Immutable.Map()) => {
  const [name, alias] = [].concat(key)

  return (store, props, result) => {
    let resultNext = key == null ? store : store.get(name, initial)

    if (val)
      resultNext = []
        .concat(val)
        .reduce((red, fn) => fn(resultNext, props, red), Immutable.Map())

    if (alias == null) {
      if (Immutable.Map.isMap(resultNext)) return result.merge(resultNext)

      return result.set(name, resultNext)
    }

    if (alias === true) return result.set(name, resultNext)

    return result.set(alias, resultNext)
  }
}
