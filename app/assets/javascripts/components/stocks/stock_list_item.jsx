import React from 'react';
/**
 * @fileoverview ストックした投稿の明細のComponentのファイルです。
 * @author takayuki-ochiai
 */
import TagListItem from './tag_list_item.jsx';

var StockListItem = React.createClass({
  render() {
    var tags = [];
    this.props.stock.tags.forEach(function(tag) {
      tags.push(
        <TagListItem key={tag.name} tag={tag} />
      )
    });
    return (
        <article key={this.props.stock.id} className="stock-item">
            <div className="stock-item__user-profile"> <img className="stock-item__user-profile-image" src={this.props.stock.user.profile_image_url} /></div>
            <div className="stock-item__right">
                <div className="stock-item__user"><a href={"http://qiita.com/" + this.props.stock.user.id} target="_blank">{this.props.stock.user.id}</a> が{this.props.stock.created_at}に投稿</div>
                <div className="stock-item__title"><a href={this.props.stock.url} target="_blank">{this.props.stock.title}</a></div>
                <div className="tag-list">{tags}</div>
            </div>
        </article>
    )
  }
})

module.exports = StockListItem;
