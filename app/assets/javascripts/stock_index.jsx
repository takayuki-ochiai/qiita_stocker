var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var StockListItem = require('./stock_list_item.jsx');
var TagListItem = require('./tag_list_item.jsx');

var StockIndex = React.createClass({
  render() {
    var rows = [];
    this.props.stocks.forEach(function(stock) {
      var tags = [];
      stock.tags.forEach(function(tag) {
        tags.push(
          <TagListItem tag={tag} />
        )
      });

      stock.created_at = stock.created_at.substr(0,10).replace( /-/g , "/" );
      rows.push(
        <StockListItem stock={stock} tags={tags} />
      )
    }.bind(this));

    return (
      <div className="stock-list">
        {rows}
      </div>
    );
  }
});

module.exports = StockIndex;
