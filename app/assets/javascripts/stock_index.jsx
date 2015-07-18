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
    this.fetchStocks();
  },
  render() {
    var rows = [];
    this.state.stocks.forEach(function(stock) {
      var tags = [];
      stock.tags.forEach(function(tag) {
        tags.push(
          <div key={tag.name} className="tag-list__item-wrap"><div className="left-arrow"></div><div key={tag.name} className="tag-list__item">{tag.name}</div></div>
        )
      });

      stock.created_at = stock.created_at.substr(0,10).replace( /-/g , "/" );
      rows.push(
        <div key={stock.id} className="stock-item">
            <div className="stock-item__user-profile-image"> <img src={stock.user.profile_image_url} /></div>
            <div className="stock-item__right">
                <div className="stock-item__user"><a href="">{stock.user.id}</a>が{stock.created_at}に投稿</div>
                <div className="stock-item__title"><a href={stock.url}>{stock.title}</a></div>
                <div className="tag-list">{tags}</div>
            </div>
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