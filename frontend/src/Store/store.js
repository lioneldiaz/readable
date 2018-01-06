import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducers from '../Reducers/rootReducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const storeConfig = () => createStore(
  rootReducers, 
  composeEnhancer(
    applyMiddleware(thunk, logger)
  )
)
 

export default storeConfig