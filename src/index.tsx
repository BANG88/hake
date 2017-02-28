import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Router, browserHistory, RouteConfig } from 'react-router'
import { History } from "history";

import { Map } from 'immutable'

import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './utils/configureStore'


export type Routes = (store: Store) => RouteConfig
export interface options {
  /**
   * Can be a function with store parameter or a RouteConfig route
   * 
   * @type {(Routes | RouteConfig)}
   * @memberOf options
   */
  routes: Routes | RouteConfig
  /**
   * Can be Map or any immutable type
   * 
   * 
   * @memberOf options
   */
  initialState?
  /**
   * Can be an object within {key:Function}
   * 
   * 
   * @memberOf options
   */
  asyncReducers?: {}
  history?: History
  rootReducer?: Function
  /**
   * custom render,you can add other Provider like react-intl .
   * 
   * @type {Function}
   * @memberOf options
   */
  render?: Function
}
export interface Render {
  store
  routes: RouteConfig
  history: History
}
/**
 * default render 
 */
const defaultRender = ({store, routes, history}: Render) => <Provider store={store}>
  <Router history={history}>
    {routes}
  </Router>
</Provider>

/**
 * configure routes and others then start the app immediately
 * @param {options} options 
 * @param {string} target the target render to
 */
const hake = (
  {
    routes,
    initialState = Map(),
    asyncReducers = {},
    history = browserHistory,
    rootReducer,
    render = defaultRender
  }: options,
  target = 'root'
) => {

  /**
   * configure store
   */
  const store = configureStore(initialState, asyncReducers, rootReducer)
  /**
   * sync history with immutable support
   */
  const appHistory = syncHistoryWithStore(history, store, {
    selectLocationState(state: any) {
      return state.get('routing').toJS()
    }
  })
  /**
   * call routes with param store if it's a function 
   */
  if (typeof routes === 'function') {
    routes = routes(store)
  }
  /**
   * render params 
   */
  const renderParams = { store, routes, history: appHistory }
  /**
   * render 
   */
  const appRender = render(renderParams)

  /**
   * here we go
   */
  ReactDOM.render(appRender, document.getElementById(target))

  /**
   * export store 
   */
  return {store}

}

export default hake