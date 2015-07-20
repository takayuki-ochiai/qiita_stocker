var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var FollowTags  = require('./follow_tag.jsx');
var Followees  = require('./followees.jsx');

var StockIndexFilter = React.createClass({
  render() {
    return (
        <div className="stock-filter-index">
            <form action="" method="get">
                <FollowTags following_tags={this.props.following_tags} />
                <Followees followees={this.props.followees} />
            </form>
        </div>
    )
  }
});

module.exports = StockIndexFilter;
