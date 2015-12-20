import React from 'react';
/**
 * @fileoverview フォロー中のユーザーのフィルタオプションのコンポーネントです。
 * @author takayuki-ochiai
 */

import FilterOptionListItem from './filter_option_list_item.jsx';
import Constants from '../../constants/app_constants.js';
import FontAwesome from 'react-fontawesome';
import { FOLLOWEES } from '../../actions/action_creator.js';
import ToggleFilterOption from '../../mixins/toggle_filter_option_mixin.jsx';

var Followees = React.createClass({
  mixins: [ToggleFilterOption],
  render() {
    var rows = [];
    this.props.followees.forEach(function(followee) {
      rows.push(
        <FilterOptionListItem key={followee.id} id={followee.id} index={followee.index} imageUrl={followee.profile_image_url} filterType={FOLLOWEES} hasChecked={followee.hasChecked} />
      )
    }.bind(this));

    return(
      <div className="stock-index-filter-option">
          <h5 onClick={this.toggleFilterOption}>フォロー中のユーザー<FontAwesome name="chevron-down" rotate={ this.state.isRevealed ? "180" : null } size='lg'  /></h5>
          <ul className={"followee-list " + (this.state.isRevealed ? 'revealed' : '')}>
            {rows}
          </ul>
      </div>
    );
  }
});

module.exports = Followees;
