var AppDispatcher = require('./dispatcher.js'),
      Constants    = require('./app_constants.js')
;

var ActionCreator = {
  fetchAll() {
    $.get('/stocks/filter_data.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_FILTERS, res);
    }.bind(this));

    $.get('/stocks.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_STOCKS, res);
    }.bind(this));
  },

  //クエリ用のアクション
  storeQuery(query) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_STOCKS, query);
  }
//まだ先の話だった
  // /**
  // * 検索条件がかかった時のストック検索で使います。
  // * @param query クエリ情報を入れたオブジェクト
  // */
  // searchStocks(query) {
  //   //さしあたってスタブとして全部ストックをとりなおす
  //   $.get('/stocks.json', function(res) {
  //     AppDispatcher.handleViewAction(Constants.EMIT_QUERY, res);
  //   }.bind(this));
  // }
}

module.exports = ActionCreator;
