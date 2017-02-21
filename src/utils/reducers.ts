import { combineReducers } from 'redux-immutable'
import routerReducer from './routerReducer'
/**
 * make root reducers
 * @param {{}} asyncReducers
 * @return combined reducers
 */
export const makeRootReducer = (asyncReducers: {}) => {
  const reducers = { ...{ routing: routerReducer }, ...asyncReducers }
  // hack:  fix Action type check.
  return combineReducers(reducers) as any
}

/**
 * dynamic inject a reducer to store 
 * @param {any} store
 * @param {{key:string,reducer:Function}} 
 */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
