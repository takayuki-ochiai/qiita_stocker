var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var FilterOptionListItem = require('./filter_option_list_item.jsx');

var Followees = React.createClass({
  render() {
    var rows = [];
    this.props.followees.forEach(function(followee) {
      rows.push(
        <FilterOptionListItem key={followee.id} id={followee.id} image_url={followee.profile_image_url} filter_category={followee.id + "-user"} />
      )
    }.bind(this));

    return(
      <div className="stock-index-filter-option">
          <h5>フォロー中のユーザー</h5>
          <ul className="followee-list">
            {rows}
          </ul>
      </div>
    );
  }
});

module.exports = Followees;
