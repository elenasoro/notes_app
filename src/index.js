import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers/rootReducer';

const css = require('./app.scss');

const store = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch({
  type: 'ADD_NEW_NOTE',
  payload: [],
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.root'),
);
