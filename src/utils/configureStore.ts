import hakeReduxMiddleware from 'hake-redux'
import { createStore, applyMiddleware, compose, Store as ReduxStore } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

import makeRootReducer, { injectReducer } from './reducers'

/**
 * custom store for type check
 *
 * @interface Store
 */
export declare interface Store<S> extends ReduxStore<S> {
    /**
     * async reducers
     * @type {{}}
     * @memberOf Store
     */
    asyncReducers: {}
    /**
     * inject reducer
     * @param  {{key:string} reducer will used to peek state
     * @param  {Function}} reducer
     */
    injectReducer: (reducer: { key: string, reducer: Function }) => void
    replaceReducer: (reducer: any) => void
}


let composeEnhancers = compose
/**
 * disable redux tools on production env.
 */
if (process.env.NODE_ENV !== 'production') {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
    const win = window as Window
    if (typeof win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
        composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
}

/**
 * configure store accept an initialState and a rooterReducer params
 * @param  {any} initialState
 * @param  {{key:string,reducer:Function}} asyncReducers
 * @param  {{key:string,reducer:Function}} rooterReducers
 * @param  {any} middlewares middlewares
 */
function configureStore({ initialState, asyncReducers, rootReducer, client, middlewares = [] }) {

    const rooterReducer = makeRootReducer(asyncReducers)
    /**
     * middleware
     */
    let middleware = [
        routerMiddleware(hashHistory),
        hakeReduxMiddleware(client),
        ...middlewares
    ]

    const store: any = composeEnhancers(
        applyMiddleware(...middleware as any)
    )(createStore)(rooterReducer, initialState, )

    return configReducer(store, asyncReducers, rootReducer)

}

/**
 * configure reducer
 * @param  {any} store
 * @param  {{}} rooterReducers
 */
function configReducer<S>(store: Store<S>, asyncReducers, rootReducer) {

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
