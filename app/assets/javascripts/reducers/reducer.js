import { combineReducers } from 'redux';
import { connect } from 'react-redux';

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
export const CLEAR_CRITERIA = 'CLEAR_CRITERIA';
export const FETCH_FILTER_ITEMS = 'FETCH_FILTER_ITEMS';
export const RECEIVE_FILTER_ITEMS = 'RECEIVE_FILTER_ITEMS';
export const SELECT_PAGE = 'SELECT_PAGE';
export const PER_PAGE = 20;

/**
 * 初期データ取得用
 */

 const initialFilterState = {
   isFetching: false,
   filterItems: {
     followingTags: [],
     followees: []
   }
 }

const initialStockState = {
  isFetching: false,
  stocks: [],
  displayingStocks: [],
  stockNum: 0
}

const initialUserState = {
  userID: null
}

// TODO 初期化時だけうごかす。要検討
function filterLists(state = initialFilterState, action) {
  switch (action.type) {
    case FETCH_FILTER_ITEMS:
      return Object.assign({}, state, {
        isFetching: true,
        filterItems: state.filterItems
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
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_STOCKS:
      return Object.assign({}, state, {
        isFetching: false,
        stocks: action.stocks,
        stockNum: action.stockNum
      });
    case SELECT_PAGE:
      return Object.assign({}, state, {
        displayingStocks: state.stocks.slice((action.pageNum - 1) * PER_PAGE, (action.pageNum - 1) * PER_PAGE + PER_PAGE)
      })
    default:
      return state;
  }
}

function confirmUser(state = initialUserState, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, {
        isFetching: true,
        user: state.user
      });
    case RECEIVE_USER:
      return Object.assign({}, state, {
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
