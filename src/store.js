import { is } from 'immutable'

export default (sequence) => {
  let storePrev
  let propsPrev
  let resultPrev

  let resultNext

  return (store, props, result) => {
    if (!is(storePrev, store) || propsPrev !== props || !is(resultPrev, result)) {
      storePrev = store
      propsPrev = props
      resultPrev = result

      resultNext = [].concat(sequence).reduce((red, fn) => fn(store, props, red), result)
    }

    return resultNext
  }
}
