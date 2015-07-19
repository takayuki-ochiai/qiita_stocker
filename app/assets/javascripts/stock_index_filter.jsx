var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var FollowTags  = require('./follow_tag.jsx');
var Followees  = require('./followees.jsx');

var StockIndexFilter = React.createClass({
  fetchFilterData() {
    $.get('/stocks/filter_data.json', function(res) {
      if (this.isMounted()) {
        this.setState({following_tags: res.following_tags, followees: res.followees});
      }
    }.bind(this));
  },
  getInitialState() {
    return {
      following_tags: [],
      followees: []
    }
  },
  componentDidMount() {
    this.fetchFilterData();
  },
  render() {
    return (
        <div className="stock-filter-index">
            <form action="" method="get">
                <FollowTags following_tags={this.state.following_tags} />
                <Followees followees={this.state.followees} />
            </form>
        </div>
    )
  }
});

module.exports = StockIndexFilter;
