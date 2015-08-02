var TagListItem = React.createClass({
  render() {
    return(
      <a href={"http://qiita.com/tags/" + this.props.tag.name} className="tag-list__item-wrap" target="_blank">
          <div className="left-arrow"></div>
          <div className="tag-list__item">{this.props.tag.name}</div>
      </a>
    )
  }
});

module.exports = TagListItem;
