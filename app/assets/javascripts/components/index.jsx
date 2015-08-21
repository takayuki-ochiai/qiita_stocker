/**
 * @fileoverview メインページのControllerViewのComponentのファイルです。
 * @author takayuki-ochiai
 */

var Router = require('react-router'),
      Navigation = Router.Navigation,
      Header = require('./header.jsx'),
      /** ストックした投稿のリスト */
      StockIndex = require('./stocks/stock_index.jsx'),
      /** ストックしたフィルターのリスト */
      StockIndexFilter  = require('./filters/stock_index_filter.jsx'),
      /** 検索フィールド */
      StockSearchField = require('./stocks/stock_search_field.jsx'),
      /** Flux用 */
      AppDispatcher = require('../dispatcher/dispatcher.js'),
      /** Store */
      StockStore = require('../stores/stock_store.jsx'),
      QueryStore = require('../stores/query_store.jsx'),
      UserStore = require('../stores/user_store.jsx'),
      /** ActionCreator */
      ActionCreator = require('../actions/action_creator.js'),
      Loader = require('react-loader'),
      ReactPaginate = require('react-paginate');

/** ページあたりのストック数の定数 */
var PER_PAGE = 20;

var Index = React.createClass({
  mixins: [Navigation],

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
      keyword : '',
      isLoaded: false
    }
  },

  componentDidMount() {
    StockStore.addChangeListener(this._onStockChange);
    QueryStore.addChangeListener(this._onQueryChange);
    ActionCreator.fetchFilterOptions();
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onUserChange);
    StockStore.removeChangeListener(this._onStockChange);
    QueryStore.removeChangeListener(this._onQueryChange);
  },

  /** ログインしているかを確認する。*/
  _onUserChange() {
    if(!UserStore.isSignin()) {
      this.transitionTo('/signin');
    }
  },

  /** StockStore変更時にStoreから情報を取得する */
  _onStockChange() {
    var stocks = StockStore.getAll().stocks;
    var stockNumber = StockStore.getAll().stock_num;
    if ( stockNumber > PER_PAGE ) {
      stocks = stocks.slice(0, PER_PAGE);
    }
    this.setState({ stocks: stocks, stockNumber: stockNumber, isLoaded: true });
  },

  /** QueryStore変更時にStoreから情報を取得する */
  _onQueryChange() {
    var keyword = QueryStore.getKeyword();
    var filterOptions = QueryStore.getFilterOptions();
    this.setState({
      keyword : keyword, filterOptions: filterOptions, isLoaded: false
    });
    //さらにクエリ発行してストック情報をサーバーに問い合わせる。
    ActionCreator.searchStocks(keyword, filterOptions);
  },

  /**
   * QueryStoreに入力された検索キーワードを格納する
   * @params keyword 検索キーワード
   */
  updateKeyword(keyword) {
    ActionCreator.storeKeyword(keyword);
  },

  /**
   * 選択されたページのストックを取得する。
   * @params pageNum 選択されたページ番号
   */
  _loadStocks(pageNum) {
    return StockStore.getStocks().slice((pageNum - 1) * PER_PAGE, (pageNum - 1) * PER_PAGE + PER_PAGE);
  },

  /**
   * ページを変更する。
   * @params pageNum 選択されたページ番号
   */
  _changePage(pageNum) {
    this.setState({ isLoaded: false });
    this.setState({ stocks: this._loadStocks(pageNum), isLoaded: true });
  },

  /**
   * ページ番号がクリックされた時に実行されるメソッドです。
   * @params pageNum 選択されたページ番号
   */
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
                  <StockSearchField updateKeyword={this.updateKeyword}/>
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
                            subContainerClassName={"pagination__pages"}
                            activeClass={"pagination_active"} />
                    </div>
                  </Loader>
              </div>
          </div>
      </div>
    );
  }
})

module.exports = Index;
