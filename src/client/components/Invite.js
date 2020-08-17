import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MainNavBar from "./Common/MainNavBar";
import "../../../public/main.css";
import "../../../public/loader.css";
import { getInviteRequest } from "../request/invite";
import GlobalAlert from "./Common/GlobalAlert";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../actions/alert";
import qs from "query-string";

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingInvite: true,
    };
  }
  async componentDidMount() {
    let inviteToken = qs.parse(this.props.location.search).token;
    let inviteResult = await getInviteRequest(inviteToken);
    console.log(inviteResult);
    if (!inviteResult.status) {
      this.setState({ isCheckingInvite: false });
      this.props.setAlert("danger", inviteResult.message);
      setTimeout(() => this.props.history.push("/main"), 7000);
    } else {
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
  return bindActionCreators({ setAlert, hideAlert }, dispatch);
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    name: state.user.name,
    ...state.alert,
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invite));
