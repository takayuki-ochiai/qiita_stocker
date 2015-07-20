var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

//ストックした投稿のリスト
var StockIndex = require('./stock_index.jsx');

//ストックしたフィルターのリスト
var StockIndexFilter  = require('./stock_index_filter.jsx');

//Flux用
var AppDispatcher = require('./dispatcher.js');

//Store
var FilterStore = require('./filter_store.jsx');
var StockStore = require('./stock_store.jsx');

//ActionCreator
var ActionCreator = require('./action_creator.js');

var Index = React.createClass({
  getInitialState() {
    return {
      following_tags: FilterStore.getAll(),
      followees: []
    }
  },
  componentDidMount() {
    FilterStore.addChangeListener(this._onChange);
    ActionCreator.fetchAll();
  },
  componentWillUnmount() {
    FilterStore.removeChangeListener(this._onChange);
  },
  _onChange() {
    var following_tags = FilterStore.getAll().following_tags;
    var followees = FilterStore.getAll().followees;
    this.setState({ following_tags: following_tags, followees: followees });
  },
  render() {
    return(
      <div id="container" className="">
        <div className="c-side"><StockIndexFilter following_tags={this.state.following_tags} followees={this.state.followees} /></div>
        <div className="c-main"><StockIndex /></div>
      </div>
    );
  }
})

module.exports = Index;
