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
  render() {
    return(
      <div>
        <form className="stock-search-field" onSubmit={this.handleSubmit}>
          <div><input placeholder="ストックした投稿を検索" type="text" ref="keywordQuery" value={this.state.keywordQuery} onChange={this.handleTextChange} /></div>
          <input type="submit" value="検索する" />
        </form>
      </div>
    )
  }
});

module.exports = StockSearchField;
