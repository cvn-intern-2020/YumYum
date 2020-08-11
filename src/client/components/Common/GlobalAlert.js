import React, { Component } from "react";
import { Alert } from "react-bootstrap";

export default class GlobalAlert extends Component {
  render() {
    return (
      <Alert
        variant={this.props.alertType}
        dismissible
        onClose={this.props.toggleAlert}
      >
        {this.props.message}
      </Alert>
    );
  }
}
