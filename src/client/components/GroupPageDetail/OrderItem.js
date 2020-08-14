import React, { Component } from 'react';
import { Form, Button, Modal, ListGroup, Dropdown, Accordion, Card } from 'react-bootstrap';
import OrderConfirmList from './MemberComponent/OrderConfirm/OrderConfirmList';

export default class OrderItem extends Component {
    render() {
        return (
            <ListGroup.Item className="w-100" style={{ backgroundColor: "white" }}>
                <Accordion defaultActiveKey="0">
                    <Card style={{ borderStyle: "none" }}>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <div className="row w-100 m-0">
                                <div className="order-list-label col-3"
                                    style={{
                                        textAlign: "center",
                                        marginLeft: "-1rem"
                                    }}>
                                    {String(this.props.order.orderDate).substr(0,25)}
                                </div>
                                <div className="order-list-label col-3"
                                    style={{
                                        textAlign: "center",
                                        marginLeft: "1rem"
                                    }}>
                                    {this.props.order.userId.name}
                                </div>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <OrderConfirmList
                                    totalPrice={this.props.order.totalPrice}
                                    dishes={this.props.order.details.filter((dish) => dish.quantity > 0)}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <div className="order-list-label col-6">
                </div>
            </ListGroup.Item>
        );
    }
}
