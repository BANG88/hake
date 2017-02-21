import { middleware as reduxPackMiddleware } from 'redux-pack'
import { createStore, applyMiddleware, compose } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import makeRootReducer, { injectReducer } from './reducers'


let composeEnhancers = compose
/**
 * disable redux tools on production env.
 */
if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}

/**
 * configure store accept an initialState and a rooterReducer params
 * @param  {any} initialState
 * @param  {{key:string,reducer:Function}} rooterReducers
 */
function configureStore(initialState: any, rooterReducers = {}) {
    const rooterReducer = makeRootReducer(rooterReducers)

    const store = composeEnhancers(
        getMiddleware()
    )(createStore)(rooterReducer, initialState, )

    return configReducer(store)

}
/**
 * get middlewares
 */
function getMiddleware() {
    let middleware = [
        routerMiddleware(hashHistory),
        reduxPackMiddleware,
    ]

    return applyMiddleware(...middleware)
}

/**
 * configure reducer
 * @param  {any} store
 */
function configReducer(store: any) {

    // split reducer
    store.asyncReducers = {}
    // add injectReducer to store,so we no need to import from sub routes anymore
    store.injectReducer = ({ key, reducer }) => {
        injectReducer(store, { key, reducer })
    }

    return store
}

export default configureStore
