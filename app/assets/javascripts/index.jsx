var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

//ストックした投稿のリスト
var StockIndex = require('./stock_index.jsx');
//フォローしているタグのリスト
var FollowTags  = require('./follow_tag.jsx');

var Index = React.createClass({
  render() {
    return(
      <div id="container" className="">
        <div className="c-side"><FollowTags /></div>
        <div className="c-main"><StockIndex /></div>
      </div>
    );
  }
})

module.exports= Index;