var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var FilterOptionListItem = require('./filter_option_list_item.jsx');

var FollowTags = React.createClass({
  render() {
    var rows = [];
    this.props.following_tags.forEach(function(tag) {
      rows.push(
        <FilterOptionListItem key={tag.id} id={tag.id} image_url={tag.icon_url} filter_category={tag.id + "-following-tag"} />
      )
    }.bind(this));

    return(
      <div className="stock-index-filter-option">
          <h5>フォロー中のタグ</h5>
          <ul className="following-tags-list">
              {rows}
          </ul>
      </div>
    );
  }
});

module.exports = FollowTags;
