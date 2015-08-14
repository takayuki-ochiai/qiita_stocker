var Constants = {
  ERROR: "error",
  CHANGE_EVENT: 'change',
  CONFIRM_SIGNIN: 'confirm-signin',
  INITIALIZE_STOCKS: 'initialize-stocks',
  INITIALIZE_FILTERS: 'initialize-filters',
  INITIALIZE_USER: 'initialize-user',
  INITIALIZE_STOCK_NUMBER: 'initialize-stock-number',
  STORE_KEYWORD_QUERY: 'store-keyword-query',
  TOGGLE_FILTER_OPTION_QUERY: 'toggle-filter-option-query',
  EMIT_QUERY: 'emit-query',
  LOAD_STOCKS: 'load-stocks',

  //filter-optionの種類を表す定数
  FOLLOWEE_FILTER: 'followee-filter',
  FOLLOWING_TAG_FILTER: 'following-tag-filter',
  //filter-optionの初期化を表す定数
  CLEAR_OPTIONS: 'clear-options'
};

module.exports = Constants;
