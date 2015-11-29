import { combineReducers } from 'redux';

export const ERROR = 'ERROR'
export const CONFIRM_SIGNIN = 'CONFIRM_SIGNIN'
export const FIND_BY_KEYWORD = 'FIND_BY_KEYWORD'
export const FIND_BY_FOLLOWEE = 'FIND_BY_FOLLOWEE'
export const FIND_BY_FOLLOWING_TAG = 'FIND_BY_FOLLOWING_TAG'
export const SEARCH_STOCKS = 'SEARCH_STOCKS'
export const CLEAR_CRITERIA = 'CLEAR_CRITERIA'
export const FETCH_FILTER_ITEMS = 'FETCH_FILTER_ITEMS'

/**
 * 初期データ取得用
 */

const initialStockState = {
  stocks: []
}

const initialFilters = {
  filterOptions: {
    // TODO 要キャメルケース化
    following_tags: [],
    followees: []
  }
}

// TODO 初期化時だけうごかす。要検討
function filterLists(state = initialFilters, action) {
  switch (action.type) {
    case FETCH_FILTER_ITEMS:
      return Object.assign({}, state, {
        action: action.type
      });
    default:
      return state;
  }
}

function stockIndex(state = initialStockState, action) {
  switch (action.type) {
    case SEARCH_STOCKS:
      return Object.assign({}, {
        keywords: action.keywords,
        filterOptions: action.filterOptions,
        stocks: state.stocks
      });
    default:
      return state;
  }
}

const qiitaStockerApp = combineReducers({
  filterLists,
  stockIndex
})

export default qiitaStockerApp;
