import React from "react";

import { connect } from 'react-redux';
import { Router } from 'react-router';
import { History } from 'react-router';
import { getUser } from '../../actions/action_creator.js';

var GuestOnly = React.createClass({
  mixins: [ History ],
  componentWillMount() {
    this.props.dispatch(getUser());
  },

  componentWillUpdate(nextProps) {
    this.userWillTransfer(nextProps);
  },

  userWillTransfer(props) {
    if (props.session === true) {
      this.history.pushState(null, "/");
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
}))(GuestOnly)
