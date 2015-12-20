import React from 'react';
/**
 * @fileoverview ストックした投稿の検索フィールドを表すComponentのファイルです。
 * @author takayuki-ochiai
 */
import FontAwesome from 'react-fontawesome';
import { changeKeyword } from '../../actions/action_creator.js';
import { getStocks } from '../../actions/action_creator.js';
import { connect } from 'react-redux';

var StockSearchField = React.createClass({
  /**
   * 検索ボックスのデータの変更を検知してstateを書き換えます。
   */
  handleTextChange(event) {
    this.props.dispatch(changeKeyword(event.target.value));
  },

  /**
   * 検索ボタンが謳歌された時に検索キーワードを更新するためのメソッドを呼び出します・
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(getStocks(this.props.keyword, this.props.filterOptions));
  },

  render() {
    return(
      <div>
        <form className="stock-search-field" onSubmit={this.handleSubmit}>
          <div className="stock-search-field__wrap"><input className="stock-search-field__input" placeholder="ストックした投稿を検索" type="text" ref="keyword" value={this.props.keyword} onChange={this.handleTextChange} /><button className="stock-search-field__submit" type="submit"><FontAwesome name='search' size='lg' /></button></div>
        </form>
      </div>
    )
  }
});

module.exports = connect(function(state) {
  return {
    keyword: state.keyword.keyword,
    filterOptions: state.filterLists.filterItems
  }
})(StockSearchField);
