var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var StockTags= React.createClass({
  fetchStockTags() {
    $.get('/stocks.json', function(res) {
      if(this.isMounted()) {
        this.setState({stockTags: res.stock_tags});
      }
    }.bind(this));
  },
  getInitialState() {
    return {
      stockTags: []
    }
  },
  componentDidMount() {
    this.fetchStockTags();
  },
  render() {
    var rows = [];
    this.state.stockTags.forEach(function(tag) {
      rows.push(
        <div key={tag.name} className="stock-tag-item">
          <div className="stock-tag-item__name">{tag.name}</div>
        </div>
      )
    }.bind(this));
    return (
      <div className="stock-tags-list">
        {rows}
      </div>
    );
  }
});

module.exports = StockTags;