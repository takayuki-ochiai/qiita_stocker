/**
* @fileoverview QiitaStockerのクライアントサイドで共通で扱う定数を
*   管理するファイルです。
* @author takayuki-ochiai
*/

var Constants = {
  /** エラー時 */
  ERROR: "error",

  /** イベント発生時 */
  CHANGE_EVENT: 'change',

  /** サインイン確認時に発行する */
  CONFIRM_SIGNIN: 'confirm-signin',

  /** 初期化時に発行する */
  INITIALIZE_STOCKS: 'initialize-stocks',
  INITIALIZE_FILTERS: 'initialize-filters',
  INITIALIZE_USER: 'initialize-user',
  INITIALIZE_STOCK_NUMBER: 'initialize-stock-number',

  /** キーワード保存時に発行する */
  STORE_KEYWORD_QUERY: 'store-keyword-query',

  /** フィルター選択時に発行する */
  TOGGLE_FILTER_OPTION_QUERY: 'toggle-filter-option-query',

  /** クエリ発行 */
  EMIT_QUERY: 'emit-query',

  /** ストックした投稿を読み込み時に発行する*/
  LOAD_STOCKS: 'load-stocks',

  /** filter-optionの種類を表す定数 */
  FOLLOWEE_FILTER: 'followee-filter',
  FOLLOWING_TAG_FILTER: 'following-tag-filter',

  /** filter-optionの初期化を表す定数 */
  CLEAR_OPTIONS: 'clear-options'
};

module.exports = Constants;
