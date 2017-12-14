import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import 'react-hot-loader/patch'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import observableListStore from './model/List'

ReactDOM.render(<App store={observableListStore} />, global.document.getElementById('root'))
registerServiceWorker()
