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
import { setUser } from "../actions/user";

class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingInvite: true,
    };
  }
  async componentDidMount() {
    const { match, setAlert, history, setUser } = this.props;
    let inviteHash = match.params.inviteHash;
    let inviteResult = await getInviteRequest(inviteHash);
    if (!inviteResult.status) {
      this.setState({ isCheckingInvite: false });
      setAlert("danger", inviteResult.message);
      if (inviteResult.errCode == 401) {
        return;
      }
      setTimeout(() => history.push("/main"), 7000);
    } else {
      setUser();
      history.push(`/group/${inviteResult.groupId}`);
    }
  }
  render() {
    const { name, type, hideAlert, message, showAlert } = this.props;
    const { isCheckingInvite } = this.state;
    return (
      <div className="h-100">
        <MainNavBar name={name} />
        {showAlert ? (
          <GlobalAlert
            alertType={type}
            toggleAlert={hideAlert}
            message={message}
          />
        ) : (
          <></>
        )}

        <div className="main-body-background-div"></div>
        {isCheckingInvite ? <div className="loader"></div> : <></>}
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
