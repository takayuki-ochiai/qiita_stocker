import React from 'react';
import injectTapEventPlugin from "react-tap-event-plugin";
import Router from 'react-router';
import AppRoutes from './app-routes.jsx';

(function() {
  window.React = React; // Reactオブジェクトだけは外に出しておく
  injectTapEventPlugin();

  $(function() {
    Router.run(AppRoutes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
  });
}) ();
