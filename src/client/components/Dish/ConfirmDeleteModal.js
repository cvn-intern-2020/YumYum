import React, { Component } from "react";
import { Modal, Button, ModalTitle } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GlobalAlert from "../Common/GlobalAlert";
import { debounce } from "lodash";

class ConfirmDeleteModal extends Component {
  debounceEvent(cb, duration) {
    this.debouncedEvent = debounce(cb, duration);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }
  componentWillUnmount() {
    const { showAlert, hideAlert } = this.props;
    this.debouncedEvent.cancel();
    if (showAlert) {
      hideAlert();
    }
  }
  render() {
    const {
      show,
      handleClose,
      dish,
      showAlert,
      type,
      hideAlert,
      message,
      deleteDish,
    } = this.props;
    return (
      <Modal show={show} onHide={() => handleClose("")}>
        <Modal.Header closeButton>
          <ModalTitle>Confrim Delete Dish</ModalTitle>
        </Modal.Header>

        <Modal.Body>
          {" "}
          Are you sure want to delete "{dish.name}" dish?{" "}
          {showAlert ? (
            <GlobalAlert
              alertType={type}
              toggleAlert={hideAlert}
              message={message}
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
            onClick={this.debounceEvent(deleteDish, 250)}
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
            onClick={() => handleClose("")}
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
