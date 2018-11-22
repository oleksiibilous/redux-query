import {
  fromJS,
  getIn,
  Map,
} from 'immutable'

import init from './init'

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

  expect(fromJS).toBeCalledWith(store)
})

it('limits store if scope is passed', () => {
  const scope = ['app']

  init(helper)(store, props)
  init(helper, scope)(store, props)

  expect(getIn).toBeCalledTimes(1)
  expect(getIn).toBeCalledWith(store, scope)
})

it('passes store & props & result to helpers', () => {
  init(helper)(store, props)

  expect(helper).toBeCalledWith(store, props, expect.any(Object))
})

it('creates empty object if store is undefined & creates empty object if props is undefined', () => {
  init(helper)(undefined, undefined)

  expect(helper).toBeCalledWith(expect.any(Object), expect.any(Object), expect.any(Object))
})

it('converts any outcome to JS object', () => {
  init(helper)(store, props)

  expect(store.toJS).toBeCalled()
})
