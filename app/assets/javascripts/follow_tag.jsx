var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var FollowTags = React.createClass({
  fetchFollowTags() {
    $.get('/stocks.json', function(res) {
      if (this.isMounted()) {
        this.setState({ following_tags: res.following_tags});
      }
    }.bind(this));
  },
  getInitialState() {
    return {
      following_tags: []
    }
  },
  componentDidMount() {
    this.fetchFollowTags();
  },
  render() {
    var rows = [];
    this.state.following_tags.forEach(function(tag) {
      rows.push(
        <li key={tag.id} className="following-tags-item ui-checkbox">
          <div className="following-tags-item__icon"><img src={tag.icon_url} /></div>
          <div className="following-tags-item__id">{tag.id}</div>
          <input id={tag.id + "-occupation"} type="checkbox" />
        </li>
      )
    }.bind(this));
    return(
      <form action="" method="get">
          <div className="following-tags-filter-category">
              <h5>フォロー中のタグ</h5>
              <ul className="following-tags-list">
                  {rows}
              </ul>
          </div>
      </form>
    );
  }
});

module.exports = FollowTags;