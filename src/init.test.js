import {
  fromJS,
  getIn,
  Map
} from 'immutable'
import hash from 'object-hash'

import init from './init'

jest.mock('immutable')
jest.mock('object-hash')

const store = Map()

const props = { version: 1 }

const helper = jest.fn(((obj = {}) => obj))

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

it('calculates props checksum', () => {
  init(helper)(store, props)

  expect(hash).toBeCalledWith(props)
})


it('computes result when receives new store', () => {
  init(helper)(store, props)

  expect(helper).toBeCalledTimes(1)
})

it('computes result when receives old store & new props', () => {
  const query = init(helper)

  query(store, props)
  query(store, { version: 2 })

  expect(helper).toBeCalledTimes(2)
})

it('doesn’t computes result when receives old store & old props', () => {
  const query = init(helper)

  query(store, props)
  query(store, props)

  expect(helper).toBeCalledTimes(1)
})

it('passes store & props & result to helpers', () => {
  init(helper)(store, props)

  expect(Map).toBeCalledTimes(1)
  expect(helper).toBeCalledWith(store, props, expect.any(Object))
})

it('converts any outcome to JS object', () => {
  init(helper)(store, props)

  expect(store.toJS).toBeCalled()
})

it('creates empty object if store is undefined', () => {
  init(helper)(undefined, props)

  expect(fromJS).toBeCalledWith(expect.any(Object))
})

it('creates empty object if props is undefined', () => {
  init(helper)(undefined)

  expect(hash).toBeCalledWith(expect.any(Object))
})
