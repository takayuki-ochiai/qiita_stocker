var React = require('react'),
      Router = require('react-router'),
      DefaultRoute = Router.DefaultRoute,
      Route = Router.Route,
      RouteHandler = Router.RouteHandler,
      Index = require('./components/index.jsx'),
      Header = require('./components/header.jsx'),
      FontAwesome = require('react-fontawesome'),

var Root = React.createClass({
  render: function() {
    return (
        <div>
          <Header />
          <RouteHandler/>
        </div>
    );
  }
});





var AppRoutes = (
  <Route name="app" path="/" handler={Root}>
    <Route name="stockIndex" path="/" handler={Index} />
  </Route>
);

module.exports = AppRoutes;
