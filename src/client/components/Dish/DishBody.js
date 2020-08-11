import React, { Component } from "react";
import { Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import DishItem from "./DishItems";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class DishBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMemberModal: false,
      dishes: [1,2,3,4],
    };
  }
  toggleAddMemberModal = () => {
    this.setState({
      ...this.state,
      showAddMemberModal: !this.state.showAddMemberModal,
    });
  };
  // componentDidMount() {
  //   axios
  //     .get(
  //       `${process.env.API_URL}/api/groups/${this.props.match.params.groupId}`,
  //       {
  //         headers: {
  //           Authorization: this.props.token,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       this.setState({
  //         ...this.state,
  //         ...res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  render() {
    return (
      <div
        style={{
          backgroundImage: "url(../../../public/background2.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "94%",
        }}
      >
        {/* <AddMemberModal
          show={this.state.showAddMemberModal}
          handleClose={this.toggleAddMemberModal}
          token={this.props.token}
          {...this.props}
        /> */}
        <div className="row w-100 m-0">
          <div className="col-4"></div>

          <div
            className="mt-4 col-4"
            style={{ fontSize: "40px", textAlign: "center", color: "white" }}
          >
            {this.state.name}
          </div>

          <div className="col-4">
            <Button
              style={{ backgroundColor: "#48BDFF", color: "#080024" }}
              className="float-right mt-4 mr-5 group-button"
            >
              Add Dishes
            </Button>
          </div>
        </div>
        <div className="text-center">
          <div className="row w-100 m-0">
            <div
              style={{ textAlign: "left" }}
              className=" dish-label col mt-4 "
            >
              <b>Dishes</b>
            </div>
            <div className="dish-label col mt-4"></div>
            <div className="dish-label col mt-4"></div>
            <div className="dish-label col mt-4"></div>
          </div>
          <div className="dish-container mt-4">
            <ListGroup>
              {this.state.dishes.map((dish) => (
                <DishItem key={dish} dish={dish} />
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default withRouter(connect(mapStateToProps, null)(DishBody));
