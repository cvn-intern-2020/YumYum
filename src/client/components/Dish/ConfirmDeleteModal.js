import React, { Component } from "react";
import { Modal, Button, ModalTitle } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GlobalAlert from "../Common/GlobalAlert";

class ConfirmDeleteModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={() => this.props.handleClose("")}>
        <Modal.Header closeButton>
          <ModalTitle>Confrim Delete Dish</ModalTitle>
        </Modal.Header>

        <Modal.Body>
          {" "}
          Are you sure want to delete "{this.props.dish.name}" dish{" "}
          {this.props.showAlert ? (
            <GlobalAlert
              alertType={this.props.type}
              toggleAlert={this.props.hideAlert}
              message={this.props.message}
            />
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#48BDFF",
              color: "#080024",
              border: "none",
            }}
            variant="primary"
            onClick={() => {
              this.props.deleteDish();
            }}
          >
            Yes
          </Button>
          <Button
            style={{
              backgroundColor: "#FF5522",
              color: "#080024",
              border: "none",
            }}
            variant="secondary"
            onClick={() => {
              this.props.handleClose("");
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    ...state.alert,
  };
}

export default withRouter(connect(mapStateToProps, null)(ConfirmDeleteModal));
