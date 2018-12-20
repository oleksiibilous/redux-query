# Redux Query

Redux Query provides helpers to search through [immutable maps](https://facebook.github.io/immutable-js/docs/#/Map), cache results, return pure JS objects

## Installation

```
npm i @rocket-station/redux-query
```

## Usage

```javascript
import { init, get } from 'redux-query'

const store = fromJS({
  app: {
    foo: {
      '1': true,
      '2': false,
      '3': true,
    },
    bar: { tst: ['foo', 'bar'] },
  },
})

console.log(init([
  get('foo', [
    get('1'),
    get('3'),
  ]),
  get(['bar', true], [
    get(['tst', 'testStr'], (s) => s.join('-')),
    get(['tst', 'testArr'])
  ])
], 'app')(store)) // ​​​​​​​​​​{ '1': true,​​​​​ '3': true,​​​​​ bar: { testStr: 'foo-bar', testArr: [ 'foo', 'bar' ] } }​​​​​
```

## Motivation

We created Redux Query to simplify our interactions with Redux state. It resolves several issues:

- Provides schema-like syntax for getting values of any nesting levels
- Allows to create custom getters inside a schema
- Caches results based on provided requests
- Clears invalid cache
- Converts any income to immutable map
- Converts any outcome to js objects

## API

`init(sequence, scope)(store, props)` - initiates a new query and returns a function, which executes it

| Name | Type | Vals | Default | Description |
| - | - | - | - | - |
| `sequence` | `Array<Function>` | `Function(get, store)` | `[]` | An array of helpers, which will be executed in the sequential query
| `scope` | `Array<String>` | `[...String]` | `[]` | If it is defined it determines the root node of the map. Otherwise, each query will process the whole store
| `store` | [Immutable Map](https://facebook.github.io/immutable-js/docs/#/Map) | [Immutable Map](https://facebook.github.io/immutable-js/docs/#/Map)| [`Immutable.Map()`](https://facebook.github.io/immutable-js/docs/#/Map) | |
| `props` | `Object` | `Object` | `{}` | An object, which will be passed to any custom helper |

`get(key, val, initial)(store, props, result)` - initiates a helper, which gets a value from a store by a key, and returns a function, which executes it

| Name | Type | Vals | Default | Description |
| - | - | - | - | - |
| `key` | `null`, `String`, `Array` | `null`, `String`, `[String, String]`, `[String, true]` `[null, null]`, `[null, String]`, `[null, true]` `[String, null]`, | `undefined` | If it is passed, it will be searched in a store. If an array of two strings is passed, the first string will be used as a key, which will be searched in a store, and the second string will be used as an alias, which will be returned in a result. If the second item is not defined and a founded value is an object, it will be merged into a result. Otherwise, it will be attached to result by a key or an alias |
| `val` | `Function`, `Array<Function>` | `[...(get, store)()]` | `undefined` | If it is passed, will be used as a nested helper |
| `initial` | Any | Any | `Immutable.Map()` | It will be returned, if found val is undefined |

`store(sequence)(store, props, result)` - initiates a helper, which memorizes a result and calculates it again only if something was changed

| Name | Type | Vals | Default | Description |
| - | - | - | - | - |
| `sequence` | `Array<Function>` | `Function(get, store)` | `[]` | An array of helpers, which will be executed in the sequential query


## Inspiration

[reselect](https://github.com/reactjs/reselect)

[re-reselect](https://github.com/toomuchdesign/re-reselect)

## License

Redux Query Immutable Map is licensed under the [MIT License](http://opensource.org/licenses/MIT)

Created by [RocketStation](http://rstation.io)

