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
  * ajaxを行います。
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

  /**
  * 入力されたキーワードをQueryStoreに保存します。
  * @params keyword 入力されたキーワード
  */
  storeKeyword(keyword) {
      AppDispatcher.handleViewAction(Constants.STORE_KEYWORD_QUERY, keyword);
  },

  /**
  * フィルターオプションがクリックされた時、クリックされた
  * オプションが選択状態を変更します。
  * @params filterOption 選択されたフィルターオプションのデータ
  */
  toggleFilterOption(fiiterOption) {
    AppDispatcher.handleViewAction(Constants.TOGGLE_FILTER_OPTION_QUERY, fiiterOption);
  },

  /**
  * フィルターオプション, 検索キーワードの初期化を行います。
  * このアクションが発行されるとフィルターと検索キーワード
  * による絞り込みを全て解除します。
  */
  clearOption() {
    AppDispatcher.handleViewAction(Constants.CLEAR_OPTIONS, null);
  },

  /**
  * 与えられた検索条件に該当するストックをajaxで取得します。
  * 取得したストックはDispatcherによってStockStoreへ保存されます。
  * @param keyword検索キーワード
  * @param filterOptionsフィルターオプション
  */
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

  /**
  * ユーザーがサインイン状態にあるかを確認します。
  * session情報を取得し、UserStoreに保存します・
  *
  */
  confirmSignin() {
    $.post('/api/sessions/confirm_signin.json', function(res) {
      AppDispatcher.handleViewAction(Constants.CONFIRM_SIGNIN, res);
    })
  }
}

module.exports = ActionCreator;
