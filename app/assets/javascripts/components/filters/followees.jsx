var Router = require('react-router'),
      Link = Router.Link,
      Navigation = Router.Navigation,
      FilterOptionListItem = require('./filter_option_list_item.jsx'),
      Constants = require('../../constants/app_constants.js'),
      FontAwesome = require('react-fontawesome'),
      ToggleFilterOption = require('../../mixins/toggle_filter_option_mixin.jsx');

var Followees = React.createClass({
  mixins: [ToggleFilterOption],
  render() {
    var rows = [];
    this.props.followees.forEach(function(followee) {
      rows.push(
        <FilterOptionListItem key={followee.id} id={followee.id} image_url={followee.profile_image_url} filter_category={Constants.FOLLOWEE_FILTER} hasChecked={followee.hasChecked} />
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
