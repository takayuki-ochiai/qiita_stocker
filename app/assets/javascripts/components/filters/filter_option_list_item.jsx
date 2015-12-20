import React from 'react';
/**
 * @fileoverview フィルターオプションの各オプション要素のComponentのファイルです。
 * @author takayuki-ochiai
 */
import FontAwesome from 'react-fontawesome';
import ActionCreator from '../../actions/action_creator.js';
import { selectFilterItem } from '../../actions/action_creator.js';
import { connect } from 'react-redux';

var FilterOptionListItem = React.createClass({
  getInitialState() {
    return {
      isMouseOver: false
    }
  },

  /**
   * フィルターオプションが選択された時、画面の一番上にスクロールし、選択されたオプションの選択状態を変更します。
   * @author takayuki-ochiai
   */
  toggleFilterOption() {
    // $('body, html').scrollTop(0);
    $("html,body").animate({scrollTop:$('html').offset().top});
    this.props.dispatch(selectFilterItem(this.props.filterType, this.props.index));
  },

  setIconVisibility() {
    if (this.props.hasChecked === true) {
      return ''
    } else {
      return 'invisible'
    }
  },

  setTextColor() {
    if (this.props.hasChecked === true) {
      return 'checked'
    } else {
      return ''
    }
  },

  toggleIconStyle() {
    this.setState({ isMouseOver: !this.state.isMouseOver})
  },

  getIconStyle() {
    if (this.state.isMouseOver === true) {
      return 'times-circle';
    } else {
      return 'check';
    }
  },

  render() {
    return(
      <li className={"stock-index-filter-option__item-wrapper " + this.setTextColor()}>
          <div className="stock-index-filter-option__item ui-checkbox" onClick={this.toggleFilterOption} onMouseOver={this.toggleIconStyle} onMouseOut={this.toggleIconStyle} >
              <div className="stock-index-filter-option__image"><img src={this.props.imageUrl} /></div>
              <div className="stock-index-filter-option__label">{this.props.id}</div>
              <FontAwesome className={"stock-index-filter-option__check-icon " + this.setIconVisibility() } name={this.getIconStyle()} size='lg' />
          </div>
      </li>
    )
  }

});

module.exports = connect()(FilterOptionListItem);
