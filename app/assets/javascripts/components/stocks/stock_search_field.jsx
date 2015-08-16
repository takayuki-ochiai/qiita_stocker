var FontAwesome = require('react-fontawesome'),
      QueryStore = require('../../stores/query_store.jsx');

var StockSearchField = React.createClass({
  getInitialState() {
    return {
      keyword : ''
    }
  },
  handleTextChange(event) {
    this.setState({ keyword: event.target.value });
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateKeyword(this.state.keyword);
    //上層のCtrl-Viewのqueryのデータを更新までここでやる
    //実際のクエリの発行は更新後のCtrl-Viewに任せる
  },
  componentDidMount() {
    QueryStore.addChangeListener(this._onQueryChange);
  },
  componentWillUnmount() {
    QueryStore.removeChangeListener(this._onQueryChange);
  },
  _onQueryChange() {
    var keyword = QueryStore.getKeyword();
    this.setState({
      keyword : keyword,
    });
  },
  render() {
    return(
      <div>
        <form className="stock-search-field" onSubmit={this.handleSubmit}>
          <div className="stock-search-field__wrap"><input className="stock-search-field__input" placeholder="ストックした投稿を検索" type="text" ref="keyword" value={this.state.keyword} onChange={this.handleTextChange} /><button className="stock-search-field__submit" type="submit"><FontAwesome name='search' size='lg' /></button></div>
        </form>
      </div>
    )
  }
});

module.exports = StockSearchField;
