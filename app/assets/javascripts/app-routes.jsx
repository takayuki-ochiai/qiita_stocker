var React = require('react'),
      Router = require('react-router'),
      DefaultRoute = Router.DefaultRoute,
      Route = Router.Route,
      RouteHandler = Router.RouteHandler,
      Index = require('./components/index.jsx'),
      Header = require('./components/header.jsx'),
      Login = require('./components/login.jsx'),
      FontAwesome = require('react-fontawesome');

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
