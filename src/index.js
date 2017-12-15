import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import 'react-hot-loader/patch'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import RootStore from './model/Root'

ReactDOM.render(<App store={new RootStore()} />, global.document.getElementById('root'))
registerServiceWorker()
