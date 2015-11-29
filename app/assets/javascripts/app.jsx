import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import { Router } from 'react-router';
import AppRoutes from './app-routes.jsx';

(function() {
  window.React = React; // Reactオブジェクトだけは外に出しておく
  injectTapEventPlugin();

  $(function() {
    ReactDOM.render(
      <Router>{AppRoutes}</Router>,
      document.getElementById("container")
    );
  });
}) ();
