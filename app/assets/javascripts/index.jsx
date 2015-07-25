var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;

//ストックした投稿のリスト
var StockIndex = require('./stock_index.jsx');

//ストックしたフィルターのリスト
var StockIndexFilter  = require('./stock_index_filter.jsx');

//検索フィールド
var StockSearchField = require('./stock_search_field.jsx');

//Flux用
var AppDispatcher = require('./dispatcher.js');

//Store
var FilterStore = require('./filter_store.jsx');
var StockStore = require('./stock_store.jsx');
var QueryStore = require('./query_store.jsx');

//ActionCreator
var ActionCreator = require('./action_creator.js');

var Index = React.createClass({
  getInitialState() {
    return {
      filterOptions: {
        following_tags: [],
        followees: [],
      },
      stocks: [],
      //検索用クエリ
      keywordQuery : ''
    }
  },
  componentDidMount() {
    FilterStore.addChangeListener(this._onFilterChange);
    StockStore.addChangeListener(this._onStockChange);
    QueryStore.addChangeListener(this._onQueryChange);
    ActionCreator.fetchAll();
  },
  componentWillUnmount() {
    FilterStore.removeChangeListener(this._onFilterChange);
    StockStore.removeChangeListener(this._onStockChange);
    QueryStore.removeChangeListener(this._onQueryChange);
  },
  _onFilterChange() {
    var filterOptions = FilterStore.getAll();

    this.setState({
      filterOptions: filterOptions
    });

    ActionCreator.searchStocks(this.state.keywordQuery, filterOptions);
  },
  _onStockChange() {
    var stocks = StockStore.getAll().stocks;
    this.setState({ stocks: stocks });
  },
  _onQueryChange() {
    var keywordQuery = QueryStore.getAll().keywordQuery;
    this.setState({
      keywordQuery : keywordQuery,
    });
    //ここから下でクエリ発行する。
    ActionCreator.searchStocks(keywordQuery, this.state.filterOptions);
  },
  updateKeywordQuery(keywordQuery) {
    ActionCreator.storeKeywordQuery(keywordQuery);
  },
  render() {
    return(
      <div id="container">
          <div className="c-side"><StockIndexFilter following_tags={this.state.filterOptions.following_tags} followees={this.state.filterOptions.followees} /></div>
          <div className="c-main">
              <StockSearchField updateKeywordQuery={this.updateKeywordQuery}/>
              <StockIndex stocks={this.state.stocks} />
          </div>
      </div>
    );
  }
})

module.exports = Index;
