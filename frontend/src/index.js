import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Components/App'
import storeConfig from './Store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

const store = storeConfig()

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter><App /></BrowserRouter>
</Provider>, document.getElementById('root'))
registerServiceWorker()
