import React, { Component } from 'react';
import { Form, Button, Modal, ListGroup, Dropdown, Accordion, Card } from 'react-bootstrap';
import GlobalAlert from '../Common/GlobalAlert';

export default class OrdersListModal extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Orders list of your group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.showAlert ? (
                        <GlobalAlert
                            alertType={this.props.type}
                            toggleAlert={this.props.hideAlert}
                            message={this.props.message}
                        />
                    ) : (
                            <></>
                        )}
                    <div className="text-center-order-list-admin">
                        <div className="row w-100 m-0">
                            <div className=" order-list-label col-3 mt-4"
                                style={{ textAlign: "center" }}>
                                <b>Date</b>
                            </div>
                            <div className="order-list-label col-3 mt-4 ml-2"
                                style={{ textAlign: "center" }}>
                                <b>User</b>
                            </div>
                        </div>
                        <div className="group-container mt-4"
                            style={{ position: "relative" }}>
                            <ListGroup style={{ flexDirection: "row", borderRadius: "0" }}>
                                <ListGroup.Item className="w-100" style={{ backgroundColor: "white" }}>

                                    <Accordion defaultActiveKey="0">
                                        <Card style={{ borderStyle: "none" }}>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                <div className="row w-100 m-0">
                                                    <div className="order-list-label col-3" style={{ textAlign: "center", marginLeft: "-1rem" }}>13/8/2020</div>
                                                    <div className="order-list-label col-3" style={{ textAlign: "center", marginLeft: "1rem" }}>Huy Hoang</div>
                                                </div>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>
                                                    Details Here
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>

                                    <div className="order-list-label col-6">
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{
                            backgroundColor: "#FF5522",
                            color: "#080024",
                            border: "none",
                        }}
                        variant="primary"
                        onClick={this.props.handleClose}
                    >
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}
