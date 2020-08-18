import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearUser } from "../../actions/user";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../../../public/index.css";

class MainNavBar extends Component {
  handleLogout = () => {
    const { clearUser, history } = this.props;
    clearUser();
    history.push("/");
  };
  render() {
    const { name } = this.props;
    return (
      <div>
        <Navbar
          className="p-0"
          style={{ backgroundColor: "#FFE500" }}
          expand="lg"
        >
          <div className="row w-100 m-0">
            <div className="col-8">
              <Navbar.Brand>
                <Link to="/main">
                  <img
                    src="../../../public/yumyum.png"
                    width="250"
                    height="44"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Link>
              </Navbar.Brand>
              <Link className="mainnav-label" to="/main">
                My Group
              </Link>
              <Link className="mainnav-label" to="/dish">
                Dish Management
              </Link>
            </div>
            <div className="col p-0">
              <Button
                className="float-right mt-2 mr-2"
                style={{
                  backgroundColor: "#ff5522",
                  color: "#080024",
                }}
                onClick={this.handleLogout}
              >
                <b>Log out</b>
              </Button>
              <b
                style={{
                  fontSize: "1.5rem",
                  float: "right",
                  marginTop: "0.5rem",
                  marginRight: "0.5rem",
                  borderStyle: "solid",
                  borderRadius: "0.5rem",
                }}
              >
                {name}
              </b>
            </div>
          </div>
        </Navbar>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clearUser }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(MainNavBar));
