import { combineReducers } from 'redux-immutable'
import { Store } from './configureStore'
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
export const injectReducer = (store: Store<any>, { key, reducer }, rootReducer?: Function) => {
  /**
   * add reducer to asyncReducers
   */
  store.asyncReducers[key] = reducer

  /**
   * make an app reducer
   */
  let appReducer = makeRootReducer(store.asyncReducers)
  /**
 * root reducer,handle logout
 */
  if (typeof rootReducer === 'function') {
    appReducer = rootReducer(appReducer)
  }
  /**
   * replace store's reducers with appReducer
   */
  store.replaceReducer(appReducer)
}

export default makeRootReducer
