import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import Index from './components/index.jsx';
import Login from './components/login.jsx';
import UserOnly from './components/authentics/user_only.jsx';
import GuestOnly from './components/authentics/guest_only.jsx';
import FontAwesome from 'react-fontawesome';


var AppRoutes = (
  <Router >
    <Route path="/" component={UserOnly} >
      <IndexRoute component={Index} />
    </Route>
    <Route component={GuestOnly} >
      <Route path="/signin" component={Login} />
    </Route>
  </Router>
);

module.exports = AppRoutes;
