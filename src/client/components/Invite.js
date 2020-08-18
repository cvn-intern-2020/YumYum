import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MainNavBar from "./Common/MainNavBar";
import "../../../public/css/main/main.css";
import "../../../public/css/loader.css";
import { getInviteRequest } from "../request/invite";
import GlobalAlert from "./Common/GlobalAlert";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../actions/alert";
import { setUser } from "../actions/user";

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingInvite: true,
    };
  }
  async componentDidMount() {
    let inviteHash = this.props.match.params.inviteHash;
    let inviteResult = await getInviteRequest(inviteHash);
    if (!inviteResult.status) {
      this.setState({ isCheckingInvite: false });
      this.props.setAlert("danger", inviteResult.message);
      if (inviteResult.errCode == 401) {
        return;
      }
      setTimeout(() => this.props.history.push("/main"), 7000);
    } else {
      this.props.setUser();
      this.props.history.push(`/group/${inviteResult.groupId}`);
    }
  }
  render() {
    return (
      <div className="h-100">
        <MainNavBar name={this.props.name} />
        {this.props.showAlert ? (
          <GlobalAlert
            alertType={this.props.type}
            toggleAlert={this.props.hideAlert}
            message={this.props.message}
          />
        ) : (
          <></>
        )}

        <div className="main-body-background-div"></div>
        {this.state.isCheckingInvite ? <div className="loader"></div> : <></>}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAlert, hideAlert, setUser }, dispatch);
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    name: state.user.name,
    ...state.alert,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invite));
