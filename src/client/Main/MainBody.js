import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MyOwnGroup from "./MyOwnGroup";
import MyJoinedGroup from "./MyJoinedGroup";
import AddNewGroupModal from "./AddNewGroupModal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../actions/user";
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
    if (this.props._id == ""){
      this.props.setUser(this.props.token);
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        <AddNewGroupModal
          show={this.state.showAddGroupModal}
          handleClose={this.toggleAddGroupModal}
          token={this.props.token}
        />

        <Container
          className="ml-2"
          style={{ position: "absolute", height: "55%" }}
          fluid
        >
          <MyJoinedGroup />
          <MyOwnGroup toggleAddGroupModal={this.toggleAddGroupModal} />
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    token: state.user.token,
    _id: state.user._id
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainBody));