import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import MyOwnGroup from "./MyOwnGroup";
import MyJoinedGroup from "./MyJoinedGroup";
import AddNewGroupModal from "./AddNewGroupModal";

export default class MainBody extends Component {
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
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:3000/api/groups/", {
  //       headers: {
  //         Authorization: this.props.token || this.props.location.state.token,
  //       },
  //     })
  //     .then((res, err) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         this.setState({ groups: res.data });
  //       }
  //     });
  // }

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
