import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import { Router } from 'react-router';
import AppRoutes from './app-routes.jsx';

import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux';
import qiitaStockerApp from './reducers/reducer.js';

/** ミドルウェア */
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

/** redux store */
let store = createStoreWithMiddleware(qiitaStockerApp);


(function() {
  window.React = React; // Reactオブジェクトだけは外に出しておく
  injectTapEventPlugin();

  $(function() {
    ReactDOM.render(
      <Provider store={store} >
        <Router>{AppRoutes}</Router>
      </Provider>,
      document.getElementById("container")
    );
  });
}) ();
