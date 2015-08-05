var Router = require('react-router'),
      Link = Router.Link,
      Navigation = Router.Navigation,
      StockListItem = require('./stock_list_item.jsx'),
      ReactPaginate = require('react-paginate');

var StockIndex = React.createClass({
  handlePageClick(e) {
    this.props.loadStocks(e.selected + 1);
  },
  render() {
    var rows = [];
    this.props.stocks.forEach(function(stock) {

      stock.created_at = stock.created_at.substr(0,10).replace( /-/g , "/" );
      rows.push(
        <StockListItem key={stock.id} stock={stock} />
      )
    }.bind(this));
    return (
      <div className="stock-list">
        {rows}
        <div className="text-center">
            <ReactPaginate previousLabel={"<"}
                nextLabel={">"}
                breakLabel={<li className="break"><a href="">...</a></li>}
                pageNum={Math.ceil(100 / 20)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                clickCallback={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages"}
                activeClass={"active"} />
          </div>
      </div>
    );
  }
});

module.exports = StockIndex;
