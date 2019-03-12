import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '~/reducers';
import { createLogger } from 'redux-logger';

export default function configureStore(){

  const logger = createLogger({collapsed : true});
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );

  return store;
}