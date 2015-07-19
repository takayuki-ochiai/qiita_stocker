var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var Followees = React.createClass({
  render() {
    var rows = [];
    this.props.followees.forEach(function(followee) {
      rows.push(
        <li key={followee.id} className="stock-index-filter-option__item-wrapper">
            <div className="stock-index-filter-option__item ui-checkbox">
                <div className="stock-index-filter-option__icon"><img src={followee.profile_image_url} /></div>
                <div className="stock-index-filter-option__label">{followee.id}</div>
                <input id={followee.id + "-user"} type="checkbox" />
            </div>
        </li>
      )
    }.bind(this));

    return(
      <div className="stock-index-filter-option">
          <h5>フォロー中のユーザー</h5>
          <ul className="followee-list">
            {rows}
          </ul>
      </div>
    );
  }
});

module.exports = Followees;
