import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MyOwnGroup from "./MyOwnGroup";
import MyJoinedGroup from "./MyJoinedGroup";
import AddNewGroupModal from "./AddNewGroupModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/user";
import { bindActionCreators } from "redux";

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddGroupModal: false,
    };
  }

  toggleAddGroupModal = () => {
    this.setState({
      ...this.state,
      showAddGroupModal: !this.state.showAddGroupModal,
    });
  };
  componentDidMount() {
    if (this.props._id == "") {
      this.props.setUser(this.props.token);
    }
  }

  render() {
    return (
      <div className="main-body-background-div">
        <AddNewGroupModal
          show={this.state.showAddGroupModal}
          handleClose={this.toggleAddGroupModal}
          token={this.props.token}
        />

        <Container className="ml-2 main-body-group-container" fluid>
          {this.props.groups ? (
            <>
              <MyJoinedGroup
                joinedGroups={this.props.groups.filter(
                  (group) => group.isOwner == false
                )}
              />
              <MyOwnGroup
                ownGroups={this.props.groups.filter(
                  (group) => group.isOwner == true
                )}
                toggleAddGroupModal={this.toggleAddGroupModal}
              />
            </>
          ) : (
            <></>
          )}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    _id: state.user._id,
    groups: state.user.groups,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainBody)
);
