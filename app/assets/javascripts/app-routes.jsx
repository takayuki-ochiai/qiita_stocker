import React from 'react';
import { Router, IndexRoute, DefaultRoute, Route, RouteHandler } from 'react-router';
import Index from './components/index.jsx';
import Header from './components/header.jsx';
import Login from './components/login.jsx';
import FontAwesome from 'react-fontawesome';


var AppRoutes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Index} />
    <Route path="/signin" handler={Login} />
  </Route>
);

module.exports = AppRoutes;
