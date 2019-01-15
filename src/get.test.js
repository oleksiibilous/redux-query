const { Map } = require('immutable')

const get = require('./get')

jest.mock('immutable')

const store = Map({
  obj: {},
  val: true,
})

const props = { version: 1 }

const helper = jest.fn((obj = {}) => obj)

const result = Map()

beforeEach(() => {
  Map.mockClear()
  helper.mockClear()
  result.merge.mockClear()
  result.set.mockClear()
})

it('limits store & passes fallback if key is passed', () => {
  const key = 'obj'
  const initial = {}

  get(key, null, initial)(store, props, result)
  get(null, null)(store, props, result)

  expect(store.get).toHaveBeenCalledTimes(1)
  expect(store.get).toHaveBeenCalledWith(key, initial)
})

it('passes store next & props & result to nested getters if val is passed', () => {
  get(null, helper)(store, props, result)

  expect(helper).toHaveBeenCalledWith(store, props, expect.any(Object))
})

it('assigns store next to result by alias', () => {
  const key = ['obj', 'object']

  get(key)(store, props, result)

  expect(result.set).toHaveBeenCalledWith(key[1], store[key[0]])
})

it('merges store next to result if alias is undefined & store next is immutable map', () => {
  const key = 'obj'

  get(key)(store, props, result)

  expect(result.merge).toHaveBeenCalledWith(store[key])
})

it('assigns store next to result by key if alias is undefined & store next is not immutable map', () => {
  const key = 'val'

  get(key)(store, props, result)

  expect(result.set).toHaveBeenCalledWith(key, store[key])
})

it('assigns store next to result by key if alias is true', () => {
  const key = ['obj', true]

  get(key)(store, props, result)

  expect(result.set).toHaveBeenCalledWith(key[0], store[key[0]])
})
