var Router = require('react-router');
var Link = Router.Link;
var Navigation = Router.Navigation;
var Followees = React.createClass({
  fetchFollowees() {
    $.get('/stocks.json', function(res) {
      if (this.isMounted()) {
        this.setState({ followees: res.followees});
      }
    }.bind(this));
  },
  getInitialState() {
    return {
      followees: []
    }
  },
  componentDidMount() {
    this.fetchFollowees();
  },
  render() {
    var rows = [];
    this.state.followees.forEach(function(followee) {
      rows.push(
        <div key={followee.id} className="followee-item">
          <div className="followee-item__userID">{followee.id}</div>
          <div className="followee-item__userID"><img src={followee.profile_image_url} /></div>
        </div>
      )
    }.bind(this));
    return(
      <div className="followee-list">
        {rows}
      </div>
    );
  }
});

module.exports = Followees;