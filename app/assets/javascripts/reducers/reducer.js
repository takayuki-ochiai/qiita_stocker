import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import
  {
    ERROR,
    CONFIRM_SIGNIN,
    FETCH_USER,
    RECEIVE_USER,
    FETCH_STOCKS,
    RECEIVE_STOCKS,
    CLEAR_CRITERIA,
    FETCH_FILTER_ITEMS,
    RECEIVE_FILTER_ITEMS,
    SELECT_PAGE,
    CHANGE_KEYWORD,
    TOGGLE_FILTER_ITEM,
    FOLLOWEES,
    FOLLOWING_TAG
   } from '../actions/action_creator.js'
export const PER_PAGE = 20;

/**
 * 初期データ取得用
 */

 const initialFilterState = {
   filterItems: {
     followingTags: [],
     followees: []
   }
 }

const initialKeyword = {
  keyword: ''
}

const initialStockState = {
  stocks: [],
  displayingStocks: [],
  stockNum: 0,
  isLoaded: true
}

const initialUserState = {
  user: null,
  signIn: false
}

function filterLists(state = initialFilterState, action) {
  switch (action.type) {
    case FETCH_FILTER_ITEMS:
      return Object.assign({}, state, {
        filterItems: state.filterItems
      });
    case RECEIVE_FILTER_ITEMS:
      return Object.assign({}, state, {
        filterItems: action.filterItems
      });
    case TOGGLE_FILTER_ITEM:
      // deepコピーしないとStateの情報をreducerで書き換えてしまうためObject#assignではなく$#extend
      var newState = $.extend(true, {}, state);
      var targetItem = newState.filterItems[action.filterType][action.index];
      targetItem.hasChecked = !targetItem.hasChecked;
      return Object.assign({}, newState);
    case CLEAR_CRITERIA:
      var newState = $.extend(true, {}, state);

      newState.filterItems.followingTags
        .forEach(function(filter) {
          return filter.hasChecked = false;
        });

      newState.filterItems.followees
        .forEach(function(filter) {
          return filter.hasChecked = false;
        });

      return Object.assign({}, newState);
    default:
      return state;
  }
}

function keyword(state = initialKeyword, action) {
  switch (action.type) {
    case CHANGE_KEYWORD:
      return Object.assign({}, state, {
        keyword: action.keyword
      })
    case CLEAR_CRITERIA:
      return Object.assign({}, {
        keyword: ''
      })
    default:
      return state;
  }
}

function stockIndex(state = initialStockState, action) {
  switch (action.type) {
    case FETCH_STOCKS:
      return Object.assign({}, state, {
        isLoaded: false,
      });
    case RECEIVE_STOCKS:
      return Object.assign({}, state, {
        isLoaded: true,
        stocks: action.stocks,
        stockNum: action.stockNum
      });
    case SELECT_PAGE:
      return Object.assign({}, state, {
        displayingStocks: state.stocks.slice((action.pageNum - 1) * PER_PAGE, (action.pageNum - 1) * PER_PAGE + PER_PAGE)
      });
    default:
      return state;
  }
}

function confirmUser(state = initialUserState, action) {
  switch (action.type) {
    case FETCH_USER:
      return Object.assign({}, state, {
        user: state.user
      });
    case RECEIVE_USER:
      var signIn = action.user.UserID !== null;
      return Object.assign({}, state, {
        user: action.user,
        signIn: signIn
      });
    default:
      return state;
  }
}

const qiitaStockerApp = combineReducers({
  filterLists,
  stockIndex,
  confirmUser,
  keyword
})

export default qiitaStockerApp;
