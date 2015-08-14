var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      user = {};

var UserStore = assign({}, EventEmitter.prototype, {
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

  getUser() {
    return user;
  },

  isSignin() {
    return !(user.UserID === null);
  }
});

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
  //ログインしているかの状態をStoreに保存する。
  if(payload.actionType === Constants.CONFIRM_SIGNIN) {
    user = payload.action;
    UserStore.emitChange();
  }

  //入力されたキーワードクエリをStoreに保存する
  // if(payload.actionType === Constants.INITIALIZE_USER) {
  //   user = payload.action.user;
  //   UserStore.emitChange();
  // }
});

module.exports = UserStore;
