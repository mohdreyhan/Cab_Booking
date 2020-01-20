import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { ADDCABINPUTS } from "../../../actions/Actions";
import { ADDCAB } from "../../../actions/ActionCreators";

class AddCab extends Component {
  render() {
    console.log(this.props.addcabSucMsg);
    return (
      <Container>
        <Form
          ref="form"
          style={{ marginTop: 10 }}
          onSubmit={event =>
            this.props.ADDCAB(this.props.addcab_Inputs, event, this.refs.form)
          }
        >
          <Form.Group>
            <Form.Label>Cab No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cab Number"
              onChange={this.props.ADDCABINPUTS}
              name="cab_no"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Provider</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Provider's Name"
              onChange={this.props.ADDCABINPUTS}
              name="provider"
            />
          </Form.Group>
          <div
            style={{
              backgroundColor: "#c3c4c7",
              padding: 10,
              borderRadius: 10
            }}
          >
            <p>Contract Period</p>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={this.props.ADDCABINPUTS}
                    name="from_contract_period"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter email"
                    onChange={this.props.ADDCABINPUTS}
                    name="to_contract_period"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <Form.Group>
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Capacity"
              onChange={this.props.ADDCABINPUTS}
              name="capacity"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={this.props.ADDCABINPUTS}
              name="driver_name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Driver Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Number"
              onChange={this.props.ADDCABINPUTS}
              name="driver_phno"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Cab
          </Button>
        </Form>
        <center>{this.props.addcabSucMsg}</center>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    addcab_Inputs: state.AdminReducer.addcab_Inputs,
    addcabSucMsg: state.AdminReducer.addcabSucMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADDCABINPUTS: event => {
      var name = event.target.name;
      var value = event.target.value;
      dispatch(ADDCABINPUTS(name, value));
    },
    ADDCAB: (addcab_Inputs, event, form) => {
      event.preventDefault();
      dispatch(ADDCAB(addcab_Inputs, event, form));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCab);
