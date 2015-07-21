var FontAwesome = require('react-fontawesome');

var FilterOptionListItem = React.createClass({
  render() {
    return(
      <li className="stock-index-filter-option__item-wrapper">
          <div className="stock-index-filter-option__item ui-checkbox">
              <div className="stock-index-filter-option__image"><img src={this.props.image_url} /></div>
              <div className="stock-index-filter-option__label">{this.props.id}</div>
              <FontAwesome className="stock-index-filter-option__check-icon" name='check' size='lg' />
              <input id={this.props.filter_category} type="checkbox" />
          </div>
      </li>
    )
  }
});

module.exports =FilterOptionListItem;
