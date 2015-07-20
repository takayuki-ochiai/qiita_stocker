var AppDispatcher = require('./dispatcher.js');

var url = 'http://localhost:3000/stocks/filter_data';
var ActionCreator = {
  fetchAll: function() {
    $.get('/stocks/filter_data.json', function(res) {
      AppDispatcher.handleViewAction('initialize-filters', res);
    }.bind(this));

    $.get('/stocks.json', function(res) {
      AppDispatcher.handleViewAction('initialize-stocks', res);
    }.bind(this));
  }
}

module.exports = ActionCreator;