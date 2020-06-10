import React, { Fragment } from 'react'
import { MainWrap } from '../../containers'

import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../store/phones/sagas'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../../store/reducers'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';

const saga = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(saga)
))
saga.run(rootSaga)


function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider hideIconVariant={true}>
        <MainWrap />
      </SnackbarProvider>
    </Provider>
  )
}

export default App