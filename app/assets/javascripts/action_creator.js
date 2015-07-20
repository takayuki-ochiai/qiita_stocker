var AppDispatcher = require('./dispatcher.js');

var url = 'http://localhost:3000/stocks/filter_data';
var ActionCreator = {
  fetchAll: function() {
    $.get('/stocks/filter_data.json', function(res) {
      AppDispatcher.handleViewAction(res);
    }.bind(this));
  }
}

module.exports = ActionCreator;