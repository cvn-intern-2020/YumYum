import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setAlert, hideAlert } from "../../actions/alert";
import { setGroup } from "../../actions/group";
import AdminView from "./AdminView";
import MemberView from "./MemberView";
import GlobalAlert from "../Common/GlobalAlert";
import PageNotFound from "../Common/PageNotFound";

class GroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doesGroupExist: true,
    };
  }
  async componentDidMount() {
    let result = await this.props.setGroup(this.props.match.params.groupId);
    this.setState({ doesGroupExist: result });
  }
  componentWillUnmount() {
    if (this.props.showAlert) {
      this.props.hideAlert();
    }
  }
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background2.png)",
          backgroundRepeat: "repeat-y",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        {this.props.group._id == "" ? (
          <>
            {this.state.doesGroupExist ? <div className="loader"></div> : <PageNotFound />}
          </>
        ) : this.props.group.ownerId == this.props.userId ? (
          <AdminView />
        ) : (
          <MemberView />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user._id,
    group: state.group,
    ...state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAlert,
      hideAlert,
      setGroup,
    },
    dispatch
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupBody)
);
