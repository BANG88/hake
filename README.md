# hake

> The minimal configurations for a Redux based React App powered by TypeScript

This package include the following packages, the main idea is reuse these configurations in multiple projects.

```js
  "dependencies": {
    "@types/react": "^15.0.9",
    "@types/react-dom": "^0.14.23",
    "@types/react-redux": "^4.4.36",
    "@types/react-router": "^3.0.3",
    "@types/react-router-redux": "^4.0.40",
    "@types/redux-immutable": "^3.0.33",
    "immutable": "^3.8.1",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-redux": "^5.0.2",
    "react-router": "^3.0.2",
    "react-router-redux": "^4.0.8",
    "redux": "^3.6.0",
    "redux-immutable": "^3.1.0",
    "hake-redux": "^0.0.5"
  }
```

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh

npm i hake -S 

# or

yarn add hake

```

## Get started in seconds with https://github.com/wmonk/create-react-app-typescript

- Create your awesome app using `create-react-app my-app --scripts-version=react-scripts-ts`
- Start up a local server

```sh

cd my-app

yarn start

```

Now you have a react app running at http://localhost:3000/

- Add hake support

```sh
yarn add hake
```
modify `index.tsx` to:

```diff
--- a/my-app/src/index.tsx
+++ b/my-app/src/index.tsx
@@ -1,9 +1,16 @@
-import * as React from 'react';
-import * as ReactDOM from 'react-dom';
 import App from './App';
 import './index.css';

-ReactDOM.render(
-  <App />,
-  document.getElementById('root') as HTMLElement
-);
+import hake from 'hake'
+
+// your routes configurations or
+// a function please read the source code get more informations
+
+const routes = [{
+  path: '/',
+  component: App
+}]
+
+const app = hake({ routes })
+
+app.start()

```

Thats it, now you have a running react app but with redux supported.

## Usage

```ts

import hake from 'hake'

// your routes configurations or 
// a function please read the source code get more informations

const routes = [{
    path: '/',
    component: App
}]

const app = hake({routes})

app.start()

```

For more informations please read the source file [take a look. ](./src/index.tsx)

```ts
// all options list here

export interface options {
    /**
     * Can be a function with store parameter or a RouteConfig route
     *
     * @type {(Routes | RouteConfig)}
     * @memberOf options
     */
    routes: Routes | RouteConfig;
    /**
     * Can be Map or any immutable type
     *
     *
     * @memberOf options
     */
    initialState?: any;
    /**
     * Can be an object within {key:Function}
     *
     *
     * @memberOf options
     */
    asyncReducers?: {};
    history?: History;
    rootReducer?: Function;
    /**
     * custom render,you can add other Provider like react-intl .
     *
     * @type {Function}
     * @memberOf options
     */
    render?: Function;
    middlewares?: any;
    /**
     * can use with hake-redux https://github.com/bang88/hake-redux#api
     */
    client?: any;
}
export interface Render {
    store: any;
    routes: RouteConfig;
    history: History;
}
/**
 * configure routes and others then start the app immediately
 * @param {options} options
 */
declare const hake: ({initialState, asyncReducers, history, render, routes, rootReducer, middlewares, client}: options) => {
    store: Store<{}>;
    start: (target?: string) => Element;
};
export default hake;


```


## Contribute

This package is used for special project, if you want use it in your project just clone it.

## License

MIT © bang88
