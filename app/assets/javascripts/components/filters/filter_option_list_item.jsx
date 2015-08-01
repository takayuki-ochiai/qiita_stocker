var FontAwesome = require('react-fontawesome');
var ActionCreator = require('../../actions/action_creator.js');

var FilterOptionListItem = React.createClass({
  getInitialState() {
    return {
      isMouseOver: false
    }
  },

  toggleFilterOption() {
    ActionCreator.toggleFilterOption(this.props);
  },

  setIconVisibility() {
    if (this.props.hasChecked === true) {
      return ''
    } else {
      return 'invisible'
    }
  },

  setTextColor() {
    if (this.props.hasChecked === true) {
      return 'checked'
    } else {
      return ''
    }
  },

  toggleIconStyle() {
    this.setState({ isMouseOver: !this.state.isMouseOver})
  },

  getIconStyle() {
    if (this.state.isMouseOver === true) {
      return 'times-circle';
    } else {
      return 'check';
    }
  },

  render() {
    return(
      <li className={"stock-index-filter-option__item-wrapper " + this.setTextColor()}>
          <div className="stock-index-filter-option__item ui-checkbox" onClick={this.toggleFilterOption} onMouseOver={this.toggleIconStyle} onMouseOut={this.toggleIconStyle} >
              <div className="stock-index-filter-option__image"><img src={this.props.image_url} /></div>
              <div className="stock-index-filter-option__label">{this.props.id}</div>
              <FontAwesome className={"stock-index-filter-option__check-icon " + this.setIconVisibility() } name={this.getIconStyle()} size='lg' />
              <input id={this.props.filter_category} type="checkbox" />
          </div>
      </li>
    )
  }

});

module.exports =FilterOptionListItem;
