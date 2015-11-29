/**
* @fileoverview QiitaStockerのActionCreatorです。
*   このアプリのすべてのアクションを発行します。
* @author takayuki-ochiai
*/
import AppDispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/app_constants.js';

export const ERROR = 'ERROR';
export const CONFIRM_SIGNIN = 'CONFIRM_SIGNIN';
export const FIND_BY_KEYWORD = 'FIND_BY_KEYWORD';
export const FIND_BY_FOLLOWEE = 'FIND_BY_FOLLOWEE';
export const FIND_BY_FOLLOWING_TAG = 'FIND_BY_FOLLOWING_TAG';
export const FETCH_STOCKS = 'FETCH_STOCKS';
export const RECEIVE_STOCKS = 'RECEIVE_STOCKS';
export const CLEAR_CRITERIA = 'CLEAR_CRITERIA';

export const FETCH_USER = 'FETCH_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

/**
 * 初期データ取得用
 */
export const FETCH_FILTER_ITEMS = 'FETCH_FILTER_ITEMS';
export const RECEIVE_FILTER_ITEMS = 'RECEIVE_FILTER_ITEMS';

/*
 * action creators
 */

export function fetchFilterItems() {
  return { type: FETCH_FILTER_ITEMS }
}

export function receiveFilterItems(filterItems) {
  return {
    type: RECEIVE_FILTER_ITEMS,
    filterItems: filterItems
  }
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
    if (getState.isFetching) {
      return Promise.resolve();
    } else {
      return dispatch(getFilterItems())
    }
  };
}



export function fetchStocks(keyword, filterOptions) {
  return {
    type: FETCH_STOCKS,
    keyword: keyword,
    filterOptions: filterOptions
  }
}

export function getStocks(
    keyword = null,
    filterOptions = { followingTags: [], followees: [] }
  ) {
    return dispatch => {
    // とりにいくよを宣言
    dispatch(fetchStocks(keyword, filterOptions));

    let followingTags = filterOptions.followingTags
      .filter(
        function(filter) {
          return filter.hasChecked === true
        }
      );


    let followees = filterOptions.followees
      .filter(
        function(filter) {
          return filter.hasChecked === true
        }
      );
    return $.post('/api/stocks.json',
      {
        keyword: keyword,
        followingTags: followingTags,
        followees: followees
      },
      function(res) {
      }).then(function(res) {
        dispatch(receiveStocks(res))
      });
  }
}

export function getStocksIfNeeded() {
  return (dispatch, getState) => {
    if (getState.isFetching) {
      return Promise.resolve();
    } else {
      return dispatch(getStocks())
    }
  };
}

export function receiveStocks(stocks) {
  return {
    type: RECEIVE_STOCKS,
    stocks: stocks.stocks,
    // TODO キャメルケースにする
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
      AppDispatcher.handleViewAction(Constants.CONFIRM_SIGNIN, res);
    }).then(res => dispatch(receiveUser(res)));
  }
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user
  }
}

// しっかり設計しなおさないとまずいパターンだなこれ


var ActionCreator = {
  /**
  * 初期化作業として、すべてのフィルターオプションの情報を取得する
  * ajaxを行います。
  * ajaxで取得したデータに画面上でチェック済みかを判定する
  * booleanを追加してからAppDispatcherを用いてquery_storeへ
  * 配信します。
  */
  fetchFilterOptions() {
    $.post('/api/stocks/filter_data.json', function(res) {
      res.followees.forEach(function(followee){
        followee.hasChecked = false;
      });

      res.following_tags.forEach(function(tag){
        tag.hasChecked = false;
      });

      AppDispatcher.handleViewAction(Constants.INITIALIZE_FILTERS, res);
    }.bind(this));
  },

  /**
  * 入力されたキーワードをQueryStoreに保存します。
  * @params keyword 入力されたキーワード
  */
  storeKeyword(keyword) {
    AppDispatcher.handleViewAction(Constants.STORE_KEYWORD_QUERY, keyword);
  },

  /**
  * フィルターオプションがクリックされた時、クリックされた
  * オプションが選択状態を変更します。
  * @params filterOption 選択されたフィルターオプションのデータ
  */
  toggleFilterOption(fiiterOption) {
    AppDispatcher.handleViewAction(Constants.TOGGLE_FILTER_OPTION_QUERY, fiiterOption);
  },

  /**
  * フィルターオプション, 検索キーワードの初期化を行います。
  * このアクションが発行されるとフィルターと検索キーワード
  * による絞り込みを全て解除します。
  */
  clearOption() {
    AppDispatcher.handleViewAction(Constants.CLEAR_OPTIONS, null);
  },

  /**
  * 与えられた検索条件に該当するストックをajaxで取得します。
  * 取得したストックはDispatcherによってStockStoreへ保存されます。
  * @param keyword検索キーワード
  * @param filterOptionsフィルターオプション
  */
  searchStocks(keyword, filterOptions) {

    var following_tags = filterOptions.following_tags
      .filter(
        function(filter) {
          return filter.hasChecked === true
        }
      );


    var followees = filterOptions.followees
      .filter(
        function(filter) {
          return filter.hasChecked === true
        }
      );

    $.post('/api/stocks.json',
      {
        keyword: keyword,
        following_tags: following_tags,
        followees: followees
      },
      function(res) {
        AppDispatcher.handleViewAction(Constants.EMIT_QUERY, res);
      }.bind(this)
    );
  },

  /**
  * ユーザーがサインイン状態にあるかを確認します。
  * session情報を取得し、UserStoreに保存します・
  *
  */
  confirmSignin() {
    $.post('/api/sessions/confirm_signin.json', function(res) {
      AppDispatcher.handleViewAction(Constants.CONFIRM_SIGNIN, res);
    })
  }
};

export default ActionCreator;
