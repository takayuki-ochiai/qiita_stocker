import React from "react";

import { connect } from 'react-redux';
import { Router } from 'react-router';
import { History } from 'react-router';
import { getUser } from '../../actions/action_creator.js';

var UserOnly = React.createClass({
  mixins: [ History ],
  componentWillMount() {
    this.props.dispatch(getUser());
  },

  componentWillUpdate(nextProps) {
    this.guestWillTransfer(nextProps);
  },

  guestWillTransfer(props) {
    if (props.session === false) {
      this.history.pushState(null, "/signin");
    }
  },

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
})

module.exports = connect(state => ({
  session: state.confirmUser.signIn
}))(UserOnly)
