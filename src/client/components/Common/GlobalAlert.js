import React, { Component } from "react";
import { Alert } from "react-bootstrap";

export default class GlobalAlert extends Component {
  componentDidMount() {
    this.timer = setTimeout(this.props.toggleAlert, 5000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    let { alertType, toggleAlert, message } = this.props;
    return (
      <Alert
        variant={alertType}
        dismissible
        onClose={toggleAlert}
        className="text-center mb-0"
      >
        {message}
      </Alert>
    );
  }
}
