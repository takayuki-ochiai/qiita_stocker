/**
 * @fileoverview ストックされた投稿に関わる情報を格納する
 *   Storeのためのデータです。
 * @author takayuki-ochiai
 */

var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      /** ストック情報 */
      stocks = [];

var StockStore = assign({}, EventEmitter.prototype, {
  /**
   * StockStoreのチェンジイベントを発行します。
   */
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  },

  /**
   * チェンジイベント発行時に実行されるコールバックを登録します。
   * @param {function} callback　実行されるコールバック。
   */
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  /**
   * 登録されたコールバックを削除します。
   * @param {function} callback　削除されるコールバック。
   */
  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  /**
   * すべてのストック情報を取得します
   * @return stocks すべてのストック情報
   */
  getAll() {
    return stocks;
  },

  /**
   * ストックされた投稿情報を取得します
   * @return stocks.stocks ストック情報
   */
  getStocks() {
    return stocks.stocks;
  }
});

StockStore.dispatchToken = AppDispatcher.register(function(payload) {
  /** 最初の描画のためのストック情報を格納します */
  if(payload.actionType === Constants.INITIALIZE_STOCKS) {
    stocks = payload.action;
    StockStore.emitChange();
  }

  /** 検索された結果返ってきたストック情報を格納します。 */
  if(payload.actionType === Constants.EMIT_QUERY) {
    stocks = payload.action;
    StockStore.emitChange();
  }
});

module.exports = StockStore;
