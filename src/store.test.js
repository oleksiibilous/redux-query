import { Map } from 'immutable'

import store from './store'

jest.mock('immutable')

const s = Map()

const p = { version: 1 }

const r = Map()

const helper = jest.fn((obj = {}) => obj)

beforeEach(() => {
  Map.mockClear()
  helper.mockClear()
})

it('computes result when receives new store ', () => {
  const fn = store(helper)

  fn(s, p, r)
  fn(Map({ version: 2 }), p, r)

  expect(helper).toBeCalledTimes(2)
})

it('computes result when receives new props', () => {
  const fn = store(helper)

  fn(s, p, r)
  fn(s, {}, r)

  expect(helper).toBeCalledTimes(2)
})

it('computes result when receives new result', () => {
  const fn = store(helper)

  fn(s, p, r)
  fn(s, p, Map({ version: 2 }))

  expect(helper).toBeCalledTimes(2)
})

it('doesn’t compute result when receives old store & old props & old result', () => {
  const fn = store(helper)

  fn(s, p, r)
  fn(s, p, r)

  expect(helper).toBeCalledTimes(1)
})
