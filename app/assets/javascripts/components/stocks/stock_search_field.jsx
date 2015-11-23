import React from 'react';
/**
 * @fileoverview ストックした投稿の検索フィールドを表すComponentのファイルです。
 * @author takayuki-ochiai
 */
import FontAwesome from 'react-fontawesome';
import QueryStore from '../../stores/query_store.jsx';

var StockSearchField = React.createClass({
  getInitialState() {
    return {
      keyword : ''
    }
  },

  /**
   * 検索ボックスのデータの変更を検知してstateを書き換えます。
   */
  handleTextChange(event) {
    this.setState({ keyword: event.target.value });
  },

  /**
   * 検索ボタンが謳歌された時に検索キーワードを更新するためのメソッドを呼び出します・
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateKeyword(this.state.keyword);
    //上層のCtrl-Viewのqueryのデータを更新までここでやる
    //実際のクエリの発行は更新後のCtrl-Viewに任せる
  },

  componentDidMount() {
    QueryStore.addChangeListener(this._onQueryChange);
  },

  componentWillUnmount() {
    QueryStore.removeChangeListener(this._onQueryChange);
  },

  /** QueryStore変更時にStoreから情報を取得する */
  _onQueryChange() {
    var keyword = QueryStore.getKeyword();
    this.setState({
      keyword : keyword,
    });
  },

  render() {
    return(
      <div>
        <form className="stock-search-field" onSubmit={this.handleSubmit}>
          <div className="stock-search-field__wrap"><input className="stock-search-field__input" placeholder="ストックした投稿を検索" type="text" ref="keyword" value={this.state.keyword} onChange={this.handleTextChange} /><button className="stock-search-field__submit" type="submit"><FontAwesome name='search' size='lg' /></button></div>
        </form>
      </div>
    )
  }
});

module.exports = StockSearchField;
