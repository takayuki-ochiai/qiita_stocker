import React from 'react';
/**
 * @fileoverview フィルタオプション全体のコンポーネントです。
 * @author takayuki-ochiai
 */

import FollowTags from './follow_tag.jsx';
import Followees from './followees.jsx';
import FontAwesome from 'react-fontawesome';
//ActionCreator
import ActionCreator from '../../actions/action_creator.js';

import { getFilterItemsIfNeeded } from '../../actions/action_creator.js';
// import { connect } from 'react-redux';

var StockIndexFilter = React.createClass({
  clearOption() {
    ActionCreator.clearOption();
  },
  render() {
    return (
        <div className="stock-filter-index">
            <div className="stock-filter-index__header" onClick={this.clearOption} >
                絞り込む
                <span className='stock-filter-index__filter-reset-button' >初期値に戻す <FontAwesome name='repeat' /></span>
            </div>
            <FollowTags followingTags={this.props.followingTags} />
            <Followees followees={this.props.followees} />
        </div>
    )
  }
});


module.exports = StockIndexFilter;
// module.exports = connect(function(state) {
//   return {
//     followingTags: state.filterLists.filterItems.followingTags,
//     followees: state.filterLists.filterItems.followees
//   }
// })(StockIndexFilter);
