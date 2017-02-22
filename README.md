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
    "redux-pack": "^0.1.4"
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

## Usage

```ts

import hake from 'hake'

// your routes configurations or 
// a function please read the source code get more informations

const routes = [{
    path: '/',
    component: App
}]

hake({routes})

```

For more informations please read the source file [take a look. ](./src/index.tsx)

**Note:** if you have complie errors please add this line 

```ts
/// <reference path="path/to/node_modules/hake/typings/index.d.ts" />

// your code came from here .

```

## Contribute

This package is used for special project, if you want use it in your project just clone it.

## License

MIT © bang88
