var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

//ストックした投稿のリスト
var StockIndex = require('./stock_index.jsx');

//ストックしたフィルターのリスト
var StockIndexFilter  = require('./stock_index_filter.jsx');

var Index = React.createClass({
  render() {
    return(
      <div id="container" className="">
        <div className="c-side"><StockIndexFilter /></div>
        <div className="c-main"><StockIndex /></div>
      </div>
    );
  }
})

module.exports = Index;
