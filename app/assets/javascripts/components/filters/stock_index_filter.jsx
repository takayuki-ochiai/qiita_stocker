var Router = require('react-router'),
      Link = Router.Link,
      Navigation = Router.Navigation,
      FollowTags  = require('./follow_tag.jsx'),
      Followees  = require('./followees.jsx'),
      FontAwesome = require('react-fontawesome'),
      //ActionCreator
      ActionCreator = require('../../actions/action_creator.js');

var StockIndexFilter = React.createClass({
  initializeOption() {
    ActionCreator.initializeFilterOption();
  },
  render() {
    return (
        <div className="stock-filter-index">
            <div className="stock-filter-index__header" onClick={this.initializeOption} >
                絞り込む
                <span className='stock-filter-index__filter-reset-button' >初期値に戻す <FontAwesome name='repeat' /></span>
            </div>
            <FollowTags following_tags={this.props.following_tags} />
            <Followees followees={this.props.followees} />
        </div>
    )
  }
});

module.exports = StockIndexFilter;
