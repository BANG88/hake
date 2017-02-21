declare interface ReduxPackAction {
    /**
     * action type should be a const string
     * 
     * @type {string}
     * @memberOf ReduxPackAction
     */
    type: string;
    promise?: PromiseLike<any>;
    meta?: {
        onStart?: (initialPayload?) => void,
        onFinish?: (boolean?) => void,
        onSuccess?: (res?) => void,
        onFailure?: (err?) => void,
    },
    [key: string]: any;
}
declare interface ReduxPackFinalAction {
    /**
     * action type should be a const string
     * 
     * @type {string}
     * @memberOf ReduxPackAction
     */
    type: string
    meta: any
    payload: {
        data: any
    }
    [key: string]: any
}

declare type ReduxPackHandleFn = (state?) => any

declare interface ReduxPackHandles {
    start?: ReduxPackHandleFn;
    finish?: ReduxPackHandleFn;
    failure?: ReduxPackHandleFn;
    success?: ReduxPackHandleFn;
    always?: ReduxPackHandleFn; // unnecessary, for the sake of example
}
declare type ReduxPackHandle = (state, action: ReduxPackFinalAction, handlers: ReduxPackHandles) => any

declare module "redux-pack" {
    export const handle: ReduxPackHandle
    export const middleware: any
}