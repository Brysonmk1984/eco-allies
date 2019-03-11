import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '~/reducers';
import logger from 'redux-logger';

export default function configureStore(){

  //const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
    //ReduxDevTools(applyMiddleware(thunk)),
  );

  return store;
}