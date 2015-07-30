var React            = require('react'),
      Dispatcher    = require('flux').Dispatcher,
      assign = require('object-assign')
;

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction(type, action) {
    this.dispatch({
      actionType: type,
      action: action
    });
  }
});


module.exports = AppDispatcher;
