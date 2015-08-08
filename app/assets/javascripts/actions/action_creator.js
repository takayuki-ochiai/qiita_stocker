var AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js');

var ActionCreator = {
  fetchAll() {
    $.post('/stocks/filter_data.json', function(res) {
      res.followees.forEach(function(followee){
        followee.hasChecked = false;
      });

      res.following_tags.forEach(function(tag){
        tag.hasChecked = false;
      });
      AppDispatcher.handleViewAction(Constants.INITIALIZE_FILTERS, res);
    }.bind(this));

    $.post('/stocks.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_STOCKS, res);
    }.bind(this));

    $.post('/stocks/count.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_STOCK_NUMBER, res);
    }.bind(this));
  },
  fetchUser() {
    $.post('stocks/user_data.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_USER, res);
    })
  },
  //クエリ用のアクション
  //キーワードクエリを貯蔵する
  storeKeywordQuery(query) {
      AppDispatcher.handleViewAction(Constants.STORE_KEYWORD_QUERY, query);
  },

  //フィルタークエリ用のアクション
  //クリックされたときにcheckedをtoggleするためのアクションを発行する
  toggleFilterOption(fiiterOption) {
    AppDispatcher.handleViewAction(Constants.TOGGLE_FILTER_OPTION_QUERY, fiiterOption);
  },

  /**
  * フィルターオプションの初期化を行います。このアクションが発行されるとフィルター条件を全て解除します。
  */
  initializeFilterOption() {
    AppDispatcher.handleViewAction(Constants.CLEAR_OPTIONS, null);
  },
  /**
  * 検索条件がかかった時のストック検索で使います。
  * @param keywordQuery 検索フィールドに入力されたキーワードです
  * @param filterOptionQuery フォロイーやフォロー中のタグによるフィルターの選択情報です
  */

  //このメンバ関数は未完成です！
  //今後やりたいこと
  //一致した本文の部分については太字で何文字か表示する
  //複数語句のOR検索
  //大小文字を問わない
  //できるならタグ名も検索かける
  searchStocks(keywordQuery, filterOptions, selectedPage) {

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

    $.post('/stocks.json',
      {
        keyword: keywordQuery,
        following_tags: following_tags,
        followees: followees,
        selectedPage: selectedPage
      },
      function(res) {
        AppDispatcher.handleViewAction(Constants.EMIT_QUERY, res);
      }.bind(this)
    );
  }
}

module.exports = ActionCreator;
