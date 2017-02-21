import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Router, browserHistory, RouteConfig } from 'react-router'
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
  rooterReducers?: {}
}

/**
 * configure routes and starts the app
 * @param {options} options 
 * @param {string} target the target render to
 */
export default ({routes, initialState = Map(), rooterReducers = {}}: options, target = 'root') => {

  const store = configureStore(initialState, rooterReducers)
  /**
   * sync history with immutable support
   */
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state: any) {
      return state.get('routing').toJS()
    }
  })
  if (typeof routes === 'function') {
    routes = routes(store)
  }

  /**
   * here we go
   */
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById(target)
  )

}
