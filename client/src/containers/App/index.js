import React, { Fragment } from 'react'
import { MyBar, PhoneFilter, DriveIn } from '../../containers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../store/phones/sagas'
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../../store/reducers'
import { Provider } from 'react-redux'
import { PhoneSearch } from '../../components'

const saga = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(saga)
))
saga.run(rootSaga)

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <MyBar />
        <PhoneSearch />
        <PhoneFilter />
        <DriveIn />
      </Fragment>
    </Provider>
  )
}

export default App