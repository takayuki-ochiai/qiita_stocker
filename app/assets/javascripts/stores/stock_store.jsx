var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      stocks = [],
      stockNumber = 0;

var StockStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(Constants.CHANGE_EVENT);
  },
  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },
  getAll() {
    return stocks;
  },
  getStocks() {
    return stocks.stocks;
  }
});

StockStore.dispatchToken = AppDispatcher.register(function(payload) {
  if(payload.actionType === Constants.INITIALIZE_STOCKS) {
    stocks = payload.action;
    StockStore.emitChange();
  }

  if(payload.actionType === Constants.EMIT_QUERY) {
    stocks = payload.action;
    StockStore.emitChange();
  }

  if (payload.actionType === Constants.LOAD_STOCKS) {
    StockStore.emitChange();
  }
});

module.exports = StockStore;
