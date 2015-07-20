var React            = require('react'),
      Dispatcher    = require('flux').Dispatcher,
      assign = require('object-assign')
;

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      actionType: 'initialize-filters',
      action: action
    });
  }
});


module.exports = AppDispatcher;
