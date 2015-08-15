var FontAwesome = require('react-fontawesome'),
      QueryStore = require('../../stores/query_store.jsx');

var StockSearchField = React.createClass({
  getInitialState() {
    return {
      keywordQuery : null
    }
  },
  handleTextChange(event) {
    this.setState({ keywordQuery: event.target.value });
  },
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateKeywordQuery(this.state.keywordQuery);
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
    var keywordQuery = QueryStore.getKeyword().keywordQuery;
    this.setState({
      keywordQuery : keywordQuery,
    });
  },
  render() {
    return(
      <div>
        <form className="stock-search-field" onSubmit={this.handleSubmit}>
          <div className="stock-search-field__wrap"><input className="stock-search-field__input" placeholder="ストックした投稿を検索" type="text" ref="keywordQuery" value={this.state.keywordQuery} onChange={this.handleTextChange} /><button className="stock-search-field__submit" type="submit"><FontAwesome name='search' size='lg' /></button></div>
        </form>
      </div>
    )
  }
});

module.exports = StockSearchField;
