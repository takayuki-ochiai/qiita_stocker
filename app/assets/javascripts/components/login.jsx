
var Login = React.createClass({
  authorizeOAuth() {
    document.location = "/sessions/new";
  },
  render() {
    return (
        <div className="signin-container">
            <h1>QiitaStockerはQiitaのストック記事をもっと便利に使うためのアプリです。</h1>
            <div>
                <button className="btn-signin" onClick={this.authorizeOAuth}>Qiitaでログイン</button>
            </div>
        </div>
    );  }
});

module.exports = Login;
