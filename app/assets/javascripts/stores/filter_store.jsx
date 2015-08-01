var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      filters = [];

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

  if (payload.actionType === Constants.TOGGLE_FILTER_OPTION_QUERY) {
    filters.following_tags
      .filter(function(filter) {
        return filter.id === payload.action.id;
      })
      .map(function(filter){
        return filter.hasChecked = !filter.hasChecked;
      })

    filters.followees
      .filter(function(filter) {
        return filter.id === payload.action.id;
      })
      .map(function(filter){
        return filter.hasChecked = !filter.hasChecked;
      })
    FilterStore.emitChange();
  }

  if(payload.actionType === Constants.CLEAR_OPTIONS) {
    filters.following_tags
      .map(function(filter) {
        return filter.hasChecked = false;
      });

    filters.followees
      .map(function(filter) {
        return filter.hasChecked = false;
      });

    FilterStore.emitChange();
  }
});

module.exports = FilterStore;
