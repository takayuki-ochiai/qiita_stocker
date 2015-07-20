var TagListItem = React.createClass({
  render() {
    return(
      <div key={this.props.tag.name} className="tag-list__item-wrap">
          <div className="left-arrow"></div>
          <div key={this.props.tag.name} className="tag-list__item">{this.props.tag.name}</div>
      </div>
    )
  }
});

module.exports = TagListItem;