var React = require('react'),
      Router = require('react-router'),
      DefaultRoute = Router.DefaultRoute,
      Route = Router.Route,
      RouteHandler = Router.RouteHandler,
      Index = require('./components/index.jsx'),
      UserStore = require('./stores/user_store.jsx'),
      ActionCreator = require('./actions/action_creator.js');

var Root = React.createClass({
  render: function() {
    return (
        <div>
          <Header />
          <RouteHandler/>
          <p>footer</p>
        </div>
    );
  }
});

var Header = React.createClass({
  getInitialState() {
    return {
      user: {}
    }
  },
  componentDidMount() {
    UserStore.addChangeListener(this._onUserChange);
    ActionCreator.fetchUser();
  },
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onUserChange);
  },
  _onUserChange() {
    this.setState({user: UserStore.getAll() })
  },
  render() {
    return (
      <header>
          <h1>QiitaStocker</h1>
          <img src={this.state.user.profile_image_url} />
      </header>
    )
  }
});

var PathB = React.createClass({
  render: function() { return <p>path B</p>; }
});


var AppRoutes = (
  <Route name="app" path="/" handler={Root}>
    <Route name="stockIndex" path="/" handler={Index} />
  </Route>
);

module.exports = AppRoutes;
