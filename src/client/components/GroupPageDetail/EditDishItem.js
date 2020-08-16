import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteEditedDish } from "../../actions/dish";

class EditDishItem extends Component {
  handleClickDelete = () => {
    this.props.deleteEditedDish(this.props.dish);
    this.props.updateEditedDish(false, this.props.dish);
  };
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div className=" dish-label col-4">{this.props.dish.dishName} </div>

          <div className="dish-label col-3 ">
            {this.props.dish.dishPrice} VND
          </div>
          <div className="edit-dish-label col-5">
            <Button className="float-right" onClick={this.handleClickDelete}>
              DELETE
            </Button>
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteEditedDish }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(EditDishItem));
