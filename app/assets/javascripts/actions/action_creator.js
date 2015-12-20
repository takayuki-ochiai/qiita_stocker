/**
* @fileoverview QiitaStockerのActionCreatorです。
*   このアプリのすべてのアクションを発行します。
* @author takayuki-ochiai
*/
import AppDispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/app_constants.js';

export const ERROR = 'ERROR';
export const CONFIRM_SIGNIN = 'CONFIRM_SIGNIN';
export const FETCH_STOCKS = 'FETCH_STOCKS';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const CLEAR_CRITERIA = 'CLEAR_CRITERIA';

export const FETCH_USER = 'FETCH_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const CHANGE_KEYWORD = 'CHANGE_KEYWORD';
export const TOGGLE_FILTER_ITEM = 'TOGGLE_FILTER_ITEM';

/** filter-optionの種類を表す定数 */
export const FOLLOWEES = 'followees';
export const FOLLOWING_TAG = 'followingTags';

/**
 * 初期データ取得用
 */
export const FETCH_FILTER_ITEMS = 'FETCH_FILTER_ITEMS';
export const RECEIVE_FILTER_ITEMS = 'RECEIVE_FILTER_ITEMS';

/**
 * ページング用
 */
export const SELECT_PAGE = 'SELECT_PAGE';

export function selectPage(pageNum) {
  return { type: SELECT_PAGE, pageNum: pageNum };
}

/*
 * action creators
 */

export function fetchFilterItems() {
  return { type: FETCH_FILTER_ITEMS };
}

export function receiveFilterItems(filterItems) {
  return {
    type: RECEIVE_FILTER_ITEMS,
    filterItems: filterItems
  };
}

export function getFilterItems() {
  return dispatch => {
    // とりにいくよを宣言
    dispatch(fetchFilterItems());

    return $.post('/api/stocks/filter_data.json', function(res) {
      res.followees.forEach(function(followee){
        followee.hasChecked = false;
      });

      res.followingTags.forEach(function(tag){
        tag.hasChecked = false;
      });

    }).then(res => dispatch(receiveFilterItems(res)));

  }
}

export function getFilterItemsIfNeeded() {
  return (dispatch, getState) => {
    // TODO: ここの条件は修正する
    if (!getState().stockIndex.isLoaded) {
      return Promise.resolve();
    } else {
      return dispatch(getFilterItems())
    }
  };
}

export function selectFilterItem(filterType, index) {
  return dispatch => {
    dispatch(toggleFilterItem(filterType, index));

    dispatch(getStocksIfNeeded());
  }
}

export function toggleFilterItem(filterType, index) {
  return {
    type: TOGGLE_FILTER_ITEM,
    filterType: filterType,
    index: index
  };
}

export function fetchStocks(keyword, filterOptions) {
  return {
    type: FETCH_STOCKS,
    keyword: keyword,
    filterOptions: filterOptions
  };
}

export function getStocks(
    keyword = '',
    filterOptions = { followingTags: [], followees: [] }
  ) {
    return dispatch => {
      dispatch(fetchStocks(keyword, filterOptions));

      let followingTags = filterOptions.followingTags
        .filter(
          function(filter) {
            return filter.hasChecked === true
          });


      let followees = filterOptions.followees
        .filter(
          function(filter) {
            return filter.hasChecked === true
          });
      return $.post('/api/stocks.json',
        {
          keyword: keyword,
          followingTags: followingTags,
          followees: followees
        }).then(function(res) {
          dispatch(receiveStocks(res))
        }).then(function() {
          dispatch(selectPage(1))
        });
  }
}

export function getStocksIfNeeded() {
  return (dispatch, getState) => {
    if (getState().stockIndex.isLoaded) {
      return dispatch(getStocks(getState().keyword.keyword, getState().filterLists.filterItems));
    }
  };
}

export function receiveStocks(stocks) {
  return {
    type: RECEIVE_STOCKS,
    stocks: stocks.stocks,
    stockNum: stocks.stock_num
  }
}


export function fetchUser() {
  return { type: FETCH_USER }
}

export function getUser() {
  return dispatch => {
    dispatch(fetchUser());
    return $.post('/api/sessions/confirm_signin.json', function(res) {
      dispatch(receiveUser(res));
    });
  }
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user
  }
}

export function changeKeyword(keyword) {
  return {
    type: CHANGE_KEYWORD,
    keyword: keyword
  }
}

export function clearCriteria() {
  return dispatch => {
    dispatch({ type: CLEAR_CRITERIA });
    dispatch(getStocksIfNeeded());
  }
}
