var FontAwesome = require('react-fontawesome');
 var ActionCreator = require('./action_creator.js');

var FilterOptionListItem = React.createClass({
  toggleFilterOption() {
    ActionCreator.toggleFilterOption(this.props);
  },
  toggleIconVisibility() {
    if (this.props.hasChecked === true) {
      return ''
    } else {
      return 'invisible'
    }
  },
  render() {
    return(
      <li className="stock-index-filter-option__item-wrapper">
          <div className="stock-index-filter-option__item ui-checkbox" onClick={this.toggleFilterOption} >
              <div className="stock-index-filter-option__image"><img src={this.props.image_url} /></div>
              <div className="stock-index-filter-option__label">{this.props.id}</div>
              <FontAwesome className={"stock-index-filter-option__check-icon " + this.toggleIconVisibility() } name='check' size='lg' />
              <input id={this.props.filter_category} type="checkbox" />
          </div>
      </li>
    )
  }
});

module.exports =FilterOptionListItem;
