var Router = require('react-router'),
      Link = Router.Link,
      Navigation = Router.Navigation,
      //ストックした投稿のリスト
      StockIndex = require('./stocks/stock_index.jsx'),
      //ストックしたフィルターのリスト
      StockIndexFilter  = require('./filters/stock_index_filter.jsx'),
      //検索フィールド
      StockSearchField = require('./stocks/stock_search_field.jsx'),
      //Flux用
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      //Store
      FilterStore = require('../stores/filter_store.jsx'),
      StockStore = require('../stores/stock_store.jsx'),
      StockNumStore = require('../stores/stock_num_store.jsx'),
      QueryStore = require('../stores/query_store.jsx'),
      //ActionCreator
      ActionCreator = require('../actions/action_creator.js'),
      Loader = require('react-loader'),
      ReactPaginate = require('react-paginate');

var Index = React.createClass({
  getInitialState() {
    return {
      filterOptions: {
        following_tags: [],
        followees: [],
      },
      stockNumber: 0,
      stocks: [],
      //検索用クエリ
      keywordQuery : '',
      isLoaded: false
    }
  },
  componentDidMount() {
    FilterStore.addChangeListener(this._onFilterChange);
    StockNumStore.addChangeListener(this._onStockNumberChange);
    StockStore.addChangeListener(this._onStockChange);
    QueryStore.addChangeListener(this._onQueryChange);
    ActionCreator.fetchAll();
  },
  componentWillUnmount() {
    FilterStore.removeChangeListener(this._onFilterChange);
    StockNumStore.removeChangeListener(this._onStockNumberChange);
    StockStore.removeChangeListener(this._onStockChange);
    QueryStore.removeChangeListener(this._onQueryChange);
  },
  _onFilterChange() {
    var filterOptions = FilterStore.getAll();

    this.setState({
      filterOptions: filterOptions
    });
    this.setState({ isLoaded: false });
    ActionCreator.searchStocks(this.state.keywordQuery, filterOptions);
  },
  _onStockNumberChange() {
    this.setState({ stockNumber: StockNumStore.getAll() });
  },
  _onStockChange() {
    var stocks = StockStore.getAll().stocks;
    this.setState({ stocks: stocks, isLoaded: true });
  },
  _onQueryChange() {
    var keywordQuery = QueryStore.getAll().keywordQuery;
    this.setState({
      keywordQuery : keywordQuery,
    });

    this.setState({ isLoaded: false });
    //ここから下でクエリ発行する。
    ActionCreator.searchStocks(keywordQuery, this.state.filterOptions);
  },
  updateKeywordQuery(keywordQuery) {
    ActionCreator.storeKeywordQuery(keywordQuery);
  },
  loadStocks(selectedPage) {
    this.setState({ isLoaded: false });
    ActionCreator.searchStocks(this.state.keywordQuery, this.state.filterOptions, selectedPage);
  },
  handlePageClick(e) {
    $('body, html').scrollTop(0);
    this.loadStocks(e.selected + 1);
  },
  render() {
    return(
      <div id="container">
          <div className="c-side"><StockIndexFilter following_tags={this.state.filterOptions.following_tags} followees={this.state.filterOptions.followees} /></div>
          <div className="c-main">
              <StockSearchField updateKeywordQuery={this.updateKeywordQuery}/>
              <Loader loaded={this.state.isLoaded} color="#BFBFBF" left="50%" top="20%">
                <StockIndex stocks={this.state.stocks} loadStocks={this.loadStocks} stockNumber={this.state.stockNumber} />
              </Loader>
              <div className="text-center">
                  <ReactPaginate previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={<li className="break"><a href="">...</a></li>}
                      pageNum={Math.ceil(this.state.stockNumber / 20)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      clickCallback={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages"}
                      activeClass={"active"} />
              </div>
          </div>
      </div>
    );
  }
})

module.exports = Index;
