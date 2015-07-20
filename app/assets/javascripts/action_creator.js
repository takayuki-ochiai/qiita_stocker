var AppDispatcher = require('./dispatcher.js'),
      Constants    = require('./app_constants.js')
;

var ActionCreator = {
  fetchAll() {
    $.get('/stocks/filter_data.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_FILTERS, res);
    }.bind(this));

    $.get('/stocks.json', function(res) {
      AppDispatcher.handleViewAction(Constants.INITIALIZE_STOCKS, res);
    }.bind(this));
  }
}

module.exports = ActionCreator;
