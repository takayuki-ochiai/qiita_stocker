/**
* @fileoverview QiitaStockerのActionCreatorです。
*   このアプリのすべてのアクションを発行します。
* @author takayuki-ochiai
*/

var AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js');

var ActionCreator = {
  /**
  * 初期化作業として、すべてのフィルターオプションの情報を取得する
  * ajaxを行うメソッドです。
  * ajaxで取得したデータに画面上でチェック済みかを判定する
  * booleanを追加してからAppDispatcherを用いてquery_storeへ
  * 配信します。
  */
  fetchFilterOptions() {
    $.post('/api/stocks/filter_data.json', function(res) {
      res.followees.forEach(function(followee){
        followee.hasChecked = false;
      });

      res.following_tags.forEach(function(tag){
        tag.hasChecked = false;
      });
      AppDispatcher.handleViewAction(Constants.INITIALIZE_FILTERS, res);
    }.bind(this));
  },
  /**クエリ用のアクション
  * @params
  */
  storeKeyword(keyword) {
      AppDispatcher.handleViewAction(Constants.STORE_KEYWORD_QUERY, keyword);
  },

  //フィルタークエリ用のアクション
  //クリックされたときにcheckedをtoggleするためのアクションを発行する
  toggleFilterOption(fiiterOption) {
    AppDispatcher.handleViewAction(Constants.TOGGLE_FILTER_OPTION_QUERY, fiiterOption);
  },

  /**
  * フィルターオプションの初期化を行います。このアクションが発行されるとフィルター条件を全て解除します。
  */
  clearOption() {
    AppDispatcher.handleViewAction(Constants.CLEAR_OPTIONS, null);
  },
  /**
  * 検索条件がかかった時のストック検索で使います。
  * @param keyword検索フィールドに入力されたキーワードです
  * @param filterOptionQuery フォロイーやフォロー中のタグによるフィルターの選択情報です
  */

  //このメンバ関数は未完成です！
  //今後やりたいこと
  //一致した本文の部分については太字で何文字か表示する
  //複数語句のOR検索
  //大小文字を問わない
  //できるならタグ名も検索かける
  searchStocks(keyword, filterOptions) {

    var following_tags = filterOptions.following_tags
      .filter(
        function(filter) {
          return filter.hasChecked === true
        }
      );


    var followees = filterOptions.followees
      .filter(
        function(filter) {
          return filter.hasChecked === true
        }
      );

    $.post('/api/stocks.json',
      {
        keyword: keyword,
        following_tags: following_tags,
        followees: followees
      },
      function(res) {
        AppDispatcher.handleViewAction(Constants.EMIT_QUERY, res);
      }.bind(this)
    );
  },

  confirmSignin() {
    $.post('/api/sessions/confirm_signin.json', function(res) {
      AppDispatcher.handleViewAction(Constants.CONFIRM_SIGNIN, res);
    })
  }
}

module.exports = ActionCreator;
