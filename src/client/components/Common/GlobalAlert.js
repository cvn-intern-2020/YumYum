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
