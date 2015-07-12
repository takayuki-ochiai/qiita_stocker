var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var StockIndex = React.createClass({
  fetchStocks() {
    $.get('/stocks.json', function(res) {
      if (this.isMounted()) {
        this.setState({stocks: res.stocks});
      }
    }.bind(this));
  },
  getInitialState() {
    return {
      stocks: []
    }
  },
  componentDidMount() {
    this.fetchStocks()
  },
  render() {
    var rows = [];
    this.state.stocks.forEach(function(stock) {
      rows.push(
        <div className="stock-item">
          <div className="stock-item__title">{stock.title}</div>
          <div className="stock-item__user-profile-image"> <img src={stock.user.profile_image_url} /></div>
          <div className="stock-item__user">{stock.user.id}</div>
          <div className="stock-item__post-date">{stock.created_at}</div>
        </div>
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