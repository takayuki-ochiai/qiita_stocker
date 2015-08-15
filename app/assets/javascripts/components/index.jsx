var Router = require('react-router'),
      Link = Router.Link,
      Navigation = Router.Navigation,
      Header = require('./header.jsx'),
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
      QueryStore = require('../stores/query_store.jsx'),
      UserStore = require('../stores/user_store.jsx'),
      //ActionCreator
      ActionCreator = require('../actions/action_creator.js'),
      Loader = require('react-loader'),
      ReactPaginate = require('react-paginate');

//ページあたりのストック数の定数
var PER_PAGE = 20;

var Index = React.createClass({
  mixins: [Navigation],
  //ログインしているかを確認する。
  componentWillMount() {
    UserStore.addChangeListener(this._onUserChange);
    ActionCreator.confirmSignin();
  },
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
    StockStore.addChangeListener(this._onStockChange);
    QueryStore.addChangeListener(this._onQueryChange);
    ActionCreator.fetchAll();
  },
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onUserChange);
    FilterStore.removeChangeListener(this._onFilterChange);
    StockStore.removeChangeListener(this._onStockChange);
    QueryStore.removeChangeListener(this._onQueryChange);
  },
  _onUserChange() {
    if(!UserStore.isSignin()) {
      this.transitionTo('/signin');
    }
  },
  _onFilterChange() {
    var filterOptions = FilterStore.getAll();

    this.setState({
      filterOptions: filterOptions
    });
    this.setState({ isLoaded: false });
    var keywordQuery = QueryStore.getAll().keywordQuery;
    ActionCreator.searchStocks(keywordQuery, filterOptions);
  },

  _onStockNumberChange() {
    this.setState({ stockNumber: StockNumStore.getAll() });
  },

  _onStockChange() {
    var stocks = StockStore.getAll().stocks;
    var stockNumber = StockStore.getAll().stock_num;
    if ( stockNumber > PER_PAGE ) {
      stocks = stocks.slice(0, PER_PAGE);
    }
    this.setState({ stocks: stocks, stockNumber: stockNumber, isLoaded: true });
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
  _loadStocks(selectedPage) {
    return StockStore.getStocks().slice((selectedPage - 1) * PER_PAGE, (selectedPage - 1) * PER_PAGE + PER_PAGE);
  },
  _changePage(selectedPage) {
    this.setState({ isLoaded: false });
    this.setState({ stocks: this._loadStocks(selectedPage), isLoaded: true });
  },
  handlePageClick(e) {
    $('body, html').scrollTop(0);
    this._changePage(e.selected + 1);
  },
  render() {
    return(
      <div>
          <Header />
          <div className="container">
              <div className="c-side">
                  <StockIndexFilter following_tags={this.state.filterOptions.following_tags} followees={this.state.filterOptions.followees} />
              </div>
              <div className="c-main">
                  <StockSearchField updateKeywordQuery={this.updateKeywordQuery}/>
                  <Loader loaded={this.state.isLoaded} color="#BFBFBF" left="50%" top="20%">
                    <StockIndex stocks={this.state.stocks} loadStocks={this.loadStocks} stockNumber={this.state.stockNumber} />

                    <div className="text-center">
                        <ReactPaginate previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={<li className="break"><a href="">...</a></li>}
                            pageNum={Math.ceil(this.state.stockNumber / PER_PAGE)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            clickCallback={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages"}
                            activeClass={"active"} />
                    </div>
                  </Loader>
              </div>
          </div>
      </div>
    );
  }
})

module.exports = Index;
