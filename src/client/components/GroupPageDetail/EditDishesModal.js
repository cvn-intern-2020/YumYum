import React, { Component } from 'react';
import { Modal, Button, Dropdown, ListGroup } from 'react-bootstrap';
import EditDishItem from './EditDishItem';

export default class EditDishesModal extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton style={{backgroundColor:"#48BDFF", border: "none"}}>
                    <Modal.Title>
                        Dishes list of your group
                    </Modal.Title>
                </Modal.Header>
                <div className="edit-dish-list mt-0">
                    <div className="row w-100 m-0">
                        <div
                            style={{ textAlign: "left" }}
                            className=" dish-label col-4 mt-4 "
                        >
                            <b>Food name</b>
                        </div>
                        <div className="dish-label col-3 mt-4">
                            <b>Price</b>
                        </div>
                        <div className="edit-dish-label col-5 mt-4">
                        <div style={{ backgroundColor: "#48BDFF" }}>
                    <Button
                        
                        style={{
                            backgroundColor: "#28a745",
                            color: "#080024",
                            border: "none",
                            float: "right",
                            marginLeft:"1rem"
                        }}
                        variant="primary"
                        onClick={() => {
                            this.props.handleClose();
                        }}
                    >
                        Add
                    </Button>

                    <select
                        className="custom-select"
                        style={{
                            width: "14rem",
                            float: "left",
                            overflowY: "auto",
                            overflowX: "hidden",
                            height: "3rem",
                            }}>
                        {this.props.userdish.map((dish) => {
                            return (
                                <option key={dish._id} className="pl-5" style={{ color: "#080024" }}>
                                    {dish.dishName} -   {dish.dishPrice}
                                </option>
                            );
                        })}
                    </select>

                </div>
                        </div>
                    </div>
                    <div className=" mt-4">
                        <ListGroup>
                            {this.props.dishlist.map((dish) => {
                                return (
                                    <EditDishItem
                                        show={this.props.showEditDishesModal}
                                        key={dish._id}
                                        dish={dish}

                                    />
                                );
                            })}
                        </ListGroup>
                    </div>
                </div>
                <Modal.Footer style={{backgroundColor:"#FFE500"}}>
                    <Button
                        style={{
                            backgroundColor: "#28a745",
                            color: "#080024",
                            border: "none",
                        }}
                        variant="primary"
                        onClick={() => {
                            this.props.handleClose();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "#FF5522",
                            color: "#080024",
                            border: "none",
                        }}
                        variant="secondary"
                        onClick={() => {
                            this.props.handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal >
        );
    }
}
