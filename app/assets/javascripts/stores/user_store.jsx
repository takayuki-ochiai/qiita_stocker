/**
 * @fileoverview ログインしたユーザーの情報を格納するStore
 *   のためのファイルです。
 * @author takayuki-ochiai
 */

var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      /** ユーザー情報 */
      user = {};

var UserStore = assign({}, EventEmitter.prototype, {
  /**
   * UserStoreのチェンジイベントを発行します。
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
   * 保存したユーザー情報を取得します。
   * @return ユーザー情報
   */
  getUser() {
    return user;
  },

  /**
   * ログイン状態にあるかを判定します。
   * @return true: ログインしている, false: ログインしていない
   */
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
