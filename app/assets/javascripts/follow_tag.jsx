var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var FollowTags = React.createClass({
  render() {
    var rows = [];
    this.props.following_tags.forEach(function(tag) {
      rows.push(
        <li key={tag.id} className="stock-index-filter-option__item-wrapper">
            <div className="stock-index-filter-option__item ui-checkbox">
              <div className="stock-index-filter-option__icon"><img src={tag.icon_url} /></div>
              <div className="stock-index-filter-option__label">{tag.id}</div>
              <input id={tag.id + "-following-tag"} type="checkbox" />
            </div>
        </li>
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
