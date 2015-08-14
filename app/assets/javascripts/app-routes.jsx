var React = require('react'),
      Router = require('react-router'),
      DefaultRoute = Router.DefaultRoute,
      Route = Router.Route,
      RouteHandler = Router.RouteHandler,
      Index = require('./components/index.jsx'),
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

var Header = React.createClass({
  render() {
    return (
      <header>
          <div className="header-container">
              <h1 className="header-container__logo">QiitaSearcher</h1>
          </div>
      </header>
    )
  }
});



var AppRoutes = (
  <Route name="app" path="/" handler={Root}>
    <Route name="stockIndex" path="/" handler={Index} />
  </Route>
);

module.exports = AppRoutes;
