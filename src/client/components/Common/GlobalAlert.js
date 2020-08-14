import React, { Component } from "react";
import { Alert } from "react-bootstrap";

export default class GlobalAlert extends Component {
  componentDidMount() {
    setTimeout(this.props.toggleAlert, 5000);
  }
  render() {
    return (
      <Alert
        variant={this.props.alertType}
        dismissible
        onClose={this.props.toggleAlert}
        className="text-center mb-0"
      >
        {this.props.message}
      </Alert>
    );
  }
}
