
var Login = React.createClass({
  authorizeOAuth() {
    document.location = "/sessions/new";
  },
  render() {
    return (
        <div>
          QiitaStocker
          <button onClick={this.authorizeOAuth}>hoge </button>
        </div>
    );  }
});

module.exports = Login;
