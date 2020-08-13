import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { clearUser } from "../../actions/user";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class MainNavBar extends Component {
  handleLogout = () => {
    this.props.clearUser();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <Navbar
          className="p-0"
          style={{ backgroundColor: "#FFE500" }}
          expand="lg"
        >
          <div className="row w-100 m-0">
            <div className="col-5">
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
            <div className="col"></div>
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
              <img
                src="../../../public/userava.png"
                width="40"
                height="40"
                alt="React Bootstrap logo"
                className="float-right mt-2 mr-2"
              />
              <img
                src="../../../public/noti.png"
                width="40"
                height="40"
                alt="React Bootstrap logo"
                className="float-right mt-2 mr-2"
              />
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
