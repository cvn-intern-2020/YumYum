import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PageNotFound extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>404 - Not Found!</h1>
        <Link style={{ textDecoration: "none" }} to="/main">
          Back to Home Page
        </Link>
      </div>
    );
  }
}
