/**
 * @fileoverview メインページのControllerViewのComponentのファイルです。
 * @author takayuki-ochiai
 */

import React from 'react';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';



import Header from './header.jsx';
/** ストックした投稿のリスト */
import StockIndex from './stocks/stock_index.jsx';
/** ストックしたフィルターのリスト */
import StockIndexFilter from './filters/stock_index_filter.jsx';
/** 検索フィールド */
import StockSearchField from './stocks/stock_search_field.jsx';
/** ActionCreator */
import { getStocksIfNeeded } from '../actions/action_creator.js';
import { getFilterItemsIfNeeded } from '../actions/action_creator.js';
import { selectPage } from '../actions/action_creator.js';
import { getUser } from '../actions/action_creator.js';
import Loader from 'react-loader';
import ReactPaginate from 'react-paginate';

/** ページあたりのストック数の定数 */
const PER_PAGE = 20;



var Index = React.createClass({

  componentWillMount() {
    this.props.dispatch(getFilterItemsIfNeeded());
    this.props.dispatch(getStocksIfNeeded());
  },

  /**
   * ページ番号がクリックされた時に実行されるメソッドです。
   * @params pageNum 選択されたページ番号
   */
  handlePageClick(e) {
    $('body, html').scrollTop(0);
    this.props.dispatch(selectPage(e.selected + 1));
  },

  render() {
    return(
      <div>
          <Header />
          <div className="container">
              <div className="c-side">
                  <StockIndexFilter followingTags={this.props.followingTags} followees={this.props.followees} />
              </div>
              <div className="c-main">
                  <StockSearchField updateKeyword={this.updateKeyword}/>
                  <Loader loaded={this.props.isLoaded} color="#BFBFBF" left="50%" top="20%">
                    <StockIndex stocks={this.props.displayingStocks} loadStocks={this.loadStocks} stockNumber={this.props.stockNumber} />

                    <div className="text-center">
                        <ReactPaginate previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<li className="break"><a href="">...</a></li>}
                            pageNum={Math.ceil(this.props.stockNum / PER_PAGE)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            clickCallback={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pagination__pages"}
                            activeClass={"pagination_active"} />
                    </div>
                  </Loader>
              </div>
          </div>
      </div>
    );
  }
})

module.exports = connect(function(state) {
  return {
    stocks: state.stockIndex.stocks,
    stockNum: state.stockIndex.stockNum,
    displayingStocks: state.stockIndex.displayingStocks,
    user: state.confirmUser.user,
    isLoaded: state.stockIndex.isLoaded,
    followingTags: state.filterLists.filterItems.followingTags,
    followees: state.filterLists.filterItems.followees
  }
})(Index);
