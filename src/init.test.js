const { fromJS, getIn, Map } = require('immutable')

const init = require('./init')

jest.mock('immutable')

const store = Map()

const props = { version: 1 }

const helper = jest.fn((obj = {}) => obj)

beforeEach(() => {
  fromJS.mockClear()
  getIn.mockClear()
  Map.mockClear()
  helper.mockClear()
  store.toJS.mockClear()
})

it('converts any income into immutable obj', () => {
  init(helper)(store, props)

  expect(fromJS).toHaveBeenCalledWith(store)
})

it('limits store if scope is passed', () => {
  const scope = ['app']

  init(helper)(store, props)
  init(helper, scope)(store, props)

  expect(getIn).toHaveBeenCalledTimes(1)
  expect(getIn).toHaveBeenCalledWith(store, scope)
})

it('passes store & props & result to helpers', () => {
  init(helper)(store, props)

  expect(helper).toHaveBeenCalledWith(store, props, expect.any(Object))
})

it('creates empty object if store is undefined & creates empty object if props is undefined', () => {
  init(helper)(undefined, undefined)

  expect(helper).toHaveBeenCalledWith(
    expect.any(Object),
    expect.any(Object),
    expect.any(Object)
  )
})

it('converts any outcome to JS object', () => {
  init(helper)(store, props)

  expect(store.toJS).toHaveBeenCalled()
})
