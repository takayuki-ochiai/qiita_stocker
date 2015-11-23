import React from 'react';
/**
 * @fileoverview ログイン画面のComponentのファイルです。
 * @author takayuki-ochiai
 */

var Login = React.createClass({
  /**
   * ログイン確認画面へ遷移します。
   */
  authorizeOAuth() {
    document.location = "/sessions/new";
  },

  render() {
    return (
        <div className="signin-container">
            <h1 className="signin-container__header">QiitaStockerはQiitaのストック記事をもっと便利に使うためのアプリです。</h1>
            <div>
                <button className="btn-signin" onClick={this.authorizeOAuth}>Qiitaでログイン</button>
            </div>
        </div>
    );  }
});

module.exports = Login;
