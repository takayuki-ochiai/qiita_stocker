
var Login = React.createClass({
  authorizeOAuth() {
    document.location = "/sessions/new";
  },
  render() {
    return (
        <div className="signin-container">
          <h1>QiitaStocker</h1>
          <div>
              <button onClick={this.authorizeOAuth}>hoge </button>
          </div>
        </div>
    );  }
});

module.exports = Login;
