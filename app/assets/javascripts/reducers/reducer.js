import { combineReducers } from 'redux';

// TODO ここの定数はいつか統一する
export const ERROR = 'ERROR'
export const CONFIRM_SIGNIN = 'CONFIRM_SIGNIN'
export const FIND_BY_KEYWORD = 'FIND_BY_KEYWORD'
export const FIND_BY_FOLLOWEE = 'FIND_BY_FOLLOWEE'
export const FIND_BY_FOLLOWING_TAG = 'FIND_BY_FOLLOWING_TAG';
export const FETCH_USER = 'FETCH_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const FETCH_STOCKS = 'FETCH_STOCKS'
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const CLEAR_CRITERIA = 'CLEAR_CRITERIA'
export const FETCH_FILTER_ITEMS = 'FETCH_FILTER_ITEMS'
export const RECEIVE_FILTER_ITEMS = 'RECEIVE_FILTER_ITEMS';

/**
 * 初期データ取得用
 */

const initialStockState = {
  isFetching: false,
  stocks: []
}

const initialFilterState = {
  isFetching: false,
  filterItems: {
    // TODO 要キャメルケース化
    following_tags: [],
    followees: []
  }
}

const initialUserState = {
  userID: null
}

// TODO 初期化時だけうごかす。要検討
function filterLists(state = initialFilterState, action) {
  switch (action.type) {
    case FETCH_FILTER_ITEMS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_FILTER_ITEMS:
      return Object.assign({}, state, {
        isFetching: false,
        filterItems: action.filterItems
      });
    default:
      return state;
  }
}

function stockIndex(state = initialStockState, action) {
  switch (action.type) {
    case FETCH_STOCKS:
      return Object.assign({}, {
        isFetching: true
      });
    case RECEIVE_STOCKS:
        return Object.assign({}, {
          isFetching: false,
          stocks: action.stocks
        });
    default:
      return state;
  }
}

function confirmUser(state = initialUserState, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, {
        isFetching: true
      });
    case RECEIVE_USER:
        return Object.assign({}, {
          isFetching: false,
          user: action.user
        });
    default:
      return state;
  }
}

const qiitaStockerApp = combineReducers({
  filterLists,
  stockIndex,
  confirmUser
})

export default qiitaStockerApp;
