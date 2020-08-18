import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteEditedDish } from "../../actions/dish";

class EditDishItem extends Component {
  handleClickDelete = () => {
    this.props.deleteEditedDish(this.props.dish);
  };
  render() {
    return (
      <ListGroup.Item>
        <div className="row w-100 m-0">
          <div
            className=" dish-label col-4">
            {this.props.dish.dishName}
          </div>
          <div className="dish-label col-3 ">
            {this.props.dish.dishPrice} VND
          </div>
          <div className="edit-dish-label col-5">
            <Form>
              <div key="default-checkbox" className="mb-3">
                <Form.Check
                  type="checkbox"
                  checked={this.props.checked}
                  onChange={ this.props.handleSelectChange } 
                  name={this.props.dish._id}
                />
              </div>
            </Form>
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
