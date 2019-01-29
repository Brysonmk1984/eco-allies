import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom'
import App from '~/Containers/App';
import history from '~/common/history';
import { Provider } from 'react-redux';
import configureStore from '~/store/configureStore';

document.addEventListener('DOMContentLoaded', function() {

  const store = configureStore();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('mount')
  );
});