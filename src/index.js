import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

import  {reducer}  from './reducers';
import App from './App';
import './index.css'

export const store = configureStore({reducer}, compose(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);