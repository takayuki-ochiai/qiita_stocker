/**
 * @fileoverview 検索ボックスに入力されたキーワードや
 *   選択されたフィルターの情報などストックの検索に関わる情報を
 *   格納するStoreのファイルです。
 * @author takayuki-ochiai
 */

var assign           = require('object-assign'),
      EventEmitter = require('events').EventEmitter,
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      Constants    = require('../constants/app_constants.js'),
      /** 検索キーワード */
      keyword = '',
      /** フィルターオプション情報 */
      filters = [];

var QueryStore = assign({}, EventEmitter.prototype, {

  /**
   * QueryStoreのチェンジイベントを発行します。
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
   * 保存された検索キーワードを取得します。
   * @return keyword 検索キーワード
   */
  getKeyword() {
    return keyword;
  },

  /**
   * 保存されたフィルタオプション情報を取得します。
   * @return filters フィルターオプション情報
   */
  getFilterOptions() {
    return filters;
  }
});

QueryStore.dispatchToken = AppDispatcher.register(function(payload) {
  /** 入力された検索キーワードをStoreに保存する */
  if(payload.actionType === Constants.STORE_KEYWORD_QUERY) {
    keyword = payload.action;
    QueryStore.emitChange();
  }

  /** 検索キーワード、フィルタオプションを初期状態に戻す */
  if(payload.actionType === Constants.CLEAR_OPTIONS) {
    keyword = '';

    filters.following_tags
      .map(function(filter) {
        return filter.hasChecked = false;
      });

    filters.followees
      .map(function(filter) {
        return filter.hasChecked = false;
      });
    QueryStore.emitChange();
  }

  /** フィルタオプションを作るための情報を格納する */
  if(payload.actionType === Constants.INITIALIZE_FILTERS) {
    filters = payload.action;
    QueryStore.emitChange();
  }

  /** フィルタオプションの選択状態を保存する */
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
    QueryStore.emitChange();
  }
});

module.exports = QueryStore;
