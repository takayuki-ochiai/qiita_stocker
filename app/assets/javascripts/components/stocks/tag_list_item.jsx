var TagListItem = React.createClass({
  render() {
    return(
      <div className="tag-list__item-wrap">
          <div className="left-arrow"></div>
          <div className="tag-list__item">{this.props.tag.name}</div>
      </div>
    )
  }
});

module.exports = TagListItem;