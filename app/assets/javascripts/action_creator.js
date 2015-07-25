var AppDispatcher = require('./dispatcher.js'),
      Constants    = require('./app_constants.js')
;

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
  searchStocks(keywordQuery, filterOptions) {
    $.post('/stocks.json',
      {
        keyword: keywordQuery,
        filterOptions: filterOptions
      },
      function(res) {
        AppDispatcher.handleViewAction(Constants.EMIT_QUERY, res);
      }.bind(this));
  }
}

module.exports = ActionCreator;
