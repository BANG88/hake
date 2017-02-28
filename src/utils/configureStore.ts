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
 * @param  {{key:string,reducer:Function}} asyncReducers
 * @param  {{key:string,reducer:Function}} rooterReducers
 * @param  {any} middlewares middlewares 
 */
function configureStore({initialState, asyncReducers, rootReducer, middlewares = []}) {
    const rooterReducer = makeRootReducer(asyncReducers)

    const store = composeEnhancers(
        getMiddleware(middlewares)
    )(createStore)(rooterReducer, initialState, )

    return configReducer(store, asyncReducers, rootReducer)

}
/**
 * get middlewares
 */
function getMiddleware(middlewares) {
    let middleware = [
        routerMiddleware(hashHistory),
        reduxPackMiddleware,
        ...middlewares
    ]

    return applyMiddleware(...middleware)
}

/**
 * configure reducer
 * @param  {any} store
 * @param  {{}} rooterReducers
 */
function configReducer(store: any, asyncReducers, rootReducer) {

    // split reducer 
    /** 
     * store asyncReducers or it will be lost
     */
    store.asyncReducers = { ...asyncReducers }
    // add injectReducer to store,so we no need to import from sub routes anymore
    store.injectReducer = ({ key, reducer }) => {
        injectReducer(store, { key, reducer }, rootReducer)
    }

    return store
}

export default configureStore
