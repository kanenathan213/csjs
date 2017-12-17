// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger' // eslint-disable-line
import { createEpicMiddleware } from 'redux-observable'
import 'babel-polyfill'
import 'rxjs'
import 'react-hot-loader/patch'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootEpic from './epics/root'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers/root'

const epicMiddleware = createEpicMiddleware(rootEpic)

const middleware = [logger, epicMiddleware]

const store = createStore(
  rootReducer(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  global.document.getElementById('root')
)
registerServiceWorker()
