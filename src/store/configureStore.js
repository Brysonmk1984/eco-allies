import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '~/reducers';

export default function configureStore(){

  //const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    //ReduxDevTools(applyMiddleware(thunk)),
  );

  return store;
}