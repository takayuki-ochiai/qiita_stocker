var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var FilterOptionListItem = require('./filter_option_list_item.jsx');
var Constants = require('./app_constants.js');
var FontAwesome = require('react-fontawesome');

var Followees = React.createClass({
  getInitialState() {
    return {
      isRevealed: false
    }
  },
  toggleFilterOption(){
    this.setState({
      isRevealed: !this.state.isRevealed
    });
  },
  render() {
    var rows = [];
    this.props.followees.forEach(function(followee) {
      rows.push(
        <FilterOptionListItem key={followee.id} id={followee.id} image_url={followee.profile_image_url} filter_category={Constants.FOLLOWEE_FILTER} hasChecked={followee.hasChecked} />
      )
    }.bind(this));

    return(
      <div className="stock-index-filter-option">
          <h5>フォロー中のユーザー<FontAwesome name="chevron-down" rotate={ this.state.isRevealed ? '' : "180" } size='lg' onClick={this.toggleFilterOption} /></h5>
          <ul className={"followee-list " + (this.state.isRevealed ? 'revealed' : '')}>
            {rows}
          </ul>
      </div>
    );
  }
});

module.exports = Followees;
