var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('./dispatcher.js'),
      Constants    = require('./app_constants.js')
;

var query = {
        keywordQuery : null,
        filterOptionQuery : []
};

var QueryStore = assign({}, EventEmitter.prototype, {
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
    return query;
  }
});

QueryStore.dispatchToken = AppDispatcher.register(function(payload) {
  //入力されたキーワードクエリをStoreに保存する
  if(payload.actionType === Constants.STORE_KEYWORD_QUERY) {
    query.keywordQuery = payload.action;
    QueryStore.emitChange();
  }
});

module.exports = QueryStore;
