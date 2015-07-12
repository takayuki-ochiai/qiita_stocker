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
        <div className="following-tags-item">
          <div className="following-tags-item__id">{tag.id}</div>
          <div className="following-tags-item__icon"><img src={tag.icon_url} /></div>
        </div>
      )
    }.bind(this));
    return(
      <div className="following-tags-list">
        {rows}
      </div>
    );
  }
});

module.exports = FollowTags;