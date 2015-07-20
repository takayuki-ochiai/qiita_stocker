var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('./dispatcher.js'),
      Constants    = require('./app_constants.js')
;

var filters = [];

var FilterStore = assign({}, EventEmitter.prototype, {
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
    return filters;
  }
});

FilterStore.dispatchToken = AppDispatcher.register(function(payload) {
  if(payload.actionType === Constants.INITIALIZE_FILTERS) {
    filters = payload.action;
    FilterStore.emitChange();
  }
});

module.exports = FilterStore;
