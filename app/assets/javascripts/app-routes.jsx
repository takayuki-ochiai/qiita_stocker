var React = require('react'),
      Router = require('react-router'),
      DefaultRoute = Router.DefaultRoute,
      Route = Router.Route,
      RouteHandler = Router.RouteHandler,
      Index = require('./components/index.jsx'),
      UserStore = require('./stores/user_store.jsx'),
      FontAwesome = require('react-fontawesome'),
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
          <div className="header-container">
              <h1 className="header-container__logo">QiitaStocker</h1>
              <div className="header-container__menu">
                  <div className="header-container__image-wrapper">
                      <img src={this.state.user.profile_image_url} />
                      <FontAwesome name="sort-desc" />
                  </div>
              </div>
          </div>
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
