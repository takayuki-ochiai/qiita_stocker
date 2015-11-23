import React from 'react';
/**
 * @fileoverview ストックした投稿一覧のComponentのファイルです。
 * @author takayuki-ochiai
 */
import StockListItem from './stock_list_item.jsx';

var StockIndex = React.createClass({
  render() {
    var rows = [];
    this.props.stocks.forEach(function(stock) {

      stock.created_at = stock.created_at.substr(0,10).replace( /-/g , "/" );
      rows.push(
        <StockListItem key={stock.id} stock={stock} />
      )
    }.bind(this));
    return (
      <div className="stock-list">
        {rows}
      </div>
    );
  }
});

module.exports = StockIndex;
