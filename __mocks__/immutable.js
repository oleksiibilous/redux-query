const immutable = jest.genMockFromModule('immutable')

const fn = (obj) => {
  if (!obj.hasOwnProperty('merge')) obj.merge = jest.fn((objNext) => ({ ...obj, ...objNext }))
  if (!obj.hasOwnProperty('get')) obj.get = jest.fn((key, initial) => obj[key] || initial)
  if (!obj.hasOwnProperty('set')) obj.set = jest.fn((key, val) => {
    obj[key] = val

    return obj
  })
  if (!obj.hasOwnProperty('toJS')) obj.toJS = jest.fn(() => obj)
  if (!obj.hasOwnProperty('version')) obj.version = 1

  return obj
}

immutable.fromJS = jest.fn((obj = {}) => fn(obj))

immutable.getIn = jest.fn((obj = {}, scope = []) => fn(obj))

immutable.is = jest.fn((objPrev = {}, objNext = {}) => objPrev.version === objNext.version)

immutable.isImmutable = jest.fn((obj = {}) => obj.isImmutable)

immutable.Map = jest.fn(() => {
  const Map = jest.fn((obj = {}) => fn(obj))

  Map.isMap = jest.fn((obj) => typeof obj === 'object')

  return Map
})()

module.exports = immutable

