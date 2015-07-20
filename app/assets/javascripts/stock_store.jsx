var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      Dispatcher    = require('flux').Dispatcher,
      dispather      = new Dispatcher()
;

var CHANGE_EVENT = 'change';

var StockStore = assign({}, EventEmitter.prototype, {
  recordStock: function(stocks) {
    this.stocks = stocks;
  },
  getStocks: function() {
    return this.stocks;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: dispather.register(function(payload) {
      if(payload.actionType === 'initialize-stocks') {
        StockStore.recordStock(payload.results);
        StockStore.emitChange();
      }

      return true;
    })
});

module.exports = StockStore;
