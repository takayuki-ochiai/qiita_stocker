var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// var StockTags = require('./stock_tags_index.jsx');
var Index = require('./index.jsx');

var Root = React.createClass({
  render: function() {
    return (
        <div>
          <p>header</p>
          <RouteHandler/>
          <p>footer</p>
        </div>
    );
  }
});

var PathA = React.createClass({
  render: function() { return <p>path A</p>; }
});

var PathB = React.createClass({
  render: function() { return <p>path B</p>; }
});


var AppRoutes = (
  <Route name="app" path="/" handler={Root}>
    <DefaultRoute handler={PathA}/>
    <Route name="stockIndex" path="/" handler={Index} />
  </Route>
);

module.exports = AppRoutes;
