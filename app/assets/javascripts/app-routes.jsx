import React from 'react';
import Router from 'react-router';
import Index from './components/index.jsx';
import Header from './components/header.jsx';
import Login from './components/login.jsx';
import FontAwesome from 'react-fontawesome';
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Root = React.createClass({
  render() {
    return (
        <div>
          <RouteHandler/>
        </div>
    );
  }
});

var AppRoutes = (
  <Route name="app" path="/" handler={Root}>
    <Route name="stockIndex" path="/" handler={Index} />
    <Route name="signin" path="/signin" handler={Login} />
  </Route>
);

module.exports = AppRoutes;
