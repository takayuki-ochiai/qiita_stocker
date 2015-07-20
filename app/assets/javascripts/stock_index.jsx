var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

var StockIndex = React.createClass({
  render() {
    var rows = [];
    this.props.stocks.forEach(function(stock) {
      var tags = [];
      stock.tags.forEach(function(tag) {
        tags.push(
          <div key={tag.name} className="tag-list__item-wrap">
              <div className="left-arrow"></div>
              <div key={tag.name} className="tag-list__item">{tag.name}</div>
          </div>
        )
      });

      stock.created_at = stock.created_at.substr(0,10).replace( /-/g , "/" );
      rows.push(
        <article key={stock.id} className="stock-item">
            <div className="stock-item__user-profile-image"> <img src={stock.user.profile_image_url} /></div>
            <div className="stock-item__right">
                <div className="stock-item__user"><a href="">{stock.user.id}</a> が{stock.created_at}に投稿</div>
                <div className="stock-item__title"><a href={stock.url}>{stock.title}</a></div>
                <div className="tag-list">{tags}</div>
            </div>
        </article>
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
