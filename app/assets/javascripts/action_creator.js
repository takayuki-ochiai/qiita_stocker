var AppDispatcher = require('./dispatcher.js');

var ActionCreator = {
  fetchAll() {
    $.get('/stocks/filter_data.json', function(res) {
      AppDispatcher.handleViewAction('initialize-filters', res);
    }.bind(this));

    $.get('/stocks.json', function(res) {
      AppDispatcher.handleViewAction('initialize-stocks', res);
    }.bind(this));
  }
}

module.exports = ActionCreator;