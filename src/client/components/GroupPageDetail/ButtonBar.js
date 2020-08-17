import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ButtonBar extends Component {
  render() {
    return (
      <div className="row w-100 m-0">
        <div className="col-4">
          {this.props.userId == this.props.ownerId ? (
            <>
              <Button
                style={{ backgroundColor: "#FF5522", color: "#080024" }}
                className="float-left mt-4 ml-5 group-button"
                onClick={this.props.toggleAddMemberModal}
              >
                Add Member
              </Button>
              <Button
                style={{ backgroundColor: "#FF5522", color: "#080024" }}
                className="float-left mt-4 ml-5 group-button"
                onClick={this.props.toggleEditDishesModal}
              >
                Edit Dishes
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>

        <div
          className="mt-4 col-4"
          style={{ fontSize: "40px", textAlign: "center", color: "white" }}
        >
          {this.props.groupName}
        </div>

        <div className="col-4">
          <Button
            style={{ backgroundColor: "#FF5522", color: "#080024" }}
            className="float-right mt-4 mr-5 group-button"
            onClick={this.props.toggleOrdersListModal}
          >
            Show Order
          </Button>
          <Button
            style={{ backgroundColor: "#FF5522", color: "#080024" }}
            className="float-right mt-4 mr-5 group-button"
            onClick={this.props.toggleMemberListModal}
          >
            Show Member
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    dishes: state.group.dishes,
    userId: state.user._id,
    ownerId: state.group.ownerId,
    groupName: state.group.name,
  };
}

export default withRouter(connect(mapStateToProps, null)(ButtonBar));
