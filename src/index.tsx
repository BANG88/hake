import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Router, browserHistory, RouteConfig } from 'react-router'
import { Map } from 'immutable'

import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './utils/configureStore'

/**
 * initial state
 */
const initialState = Map()
const store = configureStore(initialState)
/**
 * sync history with immutable support
 */
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state: any) {
    return state.get('routing').toJS()
  }
})
type routes = (store: Store) => RouteConfig
/**
 * configure routes and starts the app
 * @param {any} routes Can be a function with store parameter or a RouteConfig route
 * @param {string} target the target render to
 */
export default (routes: routes | any, target = 'root') => {

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
