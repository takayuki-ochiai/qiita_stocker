var StockListItem = React.createClass({
  render() {
    return (
        <article key={this.props.stock.id} className="stock-item">
            <div className="stock-item__user-profile-image"> <img src={this.props.stock.user.profile_image_url} /></div>
            <div className="stock-item__right">
                <div className="stock-item__user"><a href="">{this.props.stock.user.id}</a> が{this.props.stock.created_at}に投稿</div>
                <div className="stock-item__title"><a href={this.props.stock.url}>{this.props.stock.title}</a></div>
                <div className="tag-list">{this.props.tags}</div>
            </div>
        </article>
    )
  }
})

module.exports = StockListItem;
