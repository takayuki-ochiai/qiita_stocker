var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var FollowTags  = require('./follow_tag.jsx');

var StockIndexFilter = React.createClass({
    render() {
      return (
        <div className="stock-filter-index">
            <form action="" method="get">
                <FollowTags />
            </form>
        </div>
      )
    }
});

module.exports = StockIndexFilter;
