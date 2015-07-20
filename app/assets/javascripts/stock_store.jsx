var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('./dispatcher.js');
;

var CHANGE_EVENT = 'change';
var stocks = [];

var StockStore = assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAll() {
    return stocks;
  }
});

StockStore.dispatchToken = AppDispatcher.register(function(payload) {
  if(payload.actionType === 'initialize-stocks') {
    stocks = payload.action;
    StockStore.emitChange();
  }
});

module.exports = StockStore;
