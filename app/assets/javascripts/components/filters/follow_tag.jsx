import React from 'react';
/**
 * @fileoverview フォロー中のタグのフィルタオプションのコンポーネントです。
 * @author takayuki-ochiai
 */
import FilterOptionListItem from './filter_option_list_item.jsx';
import Constants from '../../constants/app_constants.js';
import FontAwesome from 'react-fontawesome';
import ToggleFilterOption from '../../mixins/toggle_filter_option_mixin.jsx';

var FollowTags = React.createClass({
  mixins: [ToggleFilterOption],
  render() {
    var rows = [];
    this.props.following_tags.forEach(function(tag) {
      rows.push(
        <FilterOptionListItem key={tag.id} id={tag.id} image_url={tag.icon_url} filter_category={Constants.FOLLOWING_TAG_FILTER} hasChecked={tag.hasChecked} />
      )
    }.bind(this));

    return(
      <div className="stock-index-filter-option">
          <h5 onClick={this.toggleFilterOption} >フォロー中のタグ<FontAwesome name="chevron-down" rotate={ this.state.isRevealed ? "180" : null } size='lg' /></h5>
          <ul className={ "following-tags-list " + (this.state.isRevealed ? 'revealed' : '') }>
              {rows}
          </ul>
      </div>
    );
  }
});

module.exports = FollowTags;
