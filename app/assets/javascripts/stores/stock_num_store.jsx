var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      stockNumber = 0;

var StockNumberStore = assign({}, EventEmitter.prototype, {
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
    return stockNumber;
  }
});

StockNumberStore.dispatchToken = AppDispatcher.register(function(payload) {
  if (payload.actionType === Constants.INITIALIZE_STOCK_NUMBER) {
    stockNumber = payload.action.stock_num;
    StockNumberStore.emitChange();
  }
});

module.exports = StockNumberStore;
