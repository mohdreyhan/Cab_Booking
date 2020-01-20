import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { CABREQUESTMODAL, CABREQUESTINPUTS } from "../../actions/Actions.js";
import { CABREQUESTCREATOR } from "../../actions/ActionCreators.js";

class NewRequest extends Component {
  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.modalShow}
      >
        <Modal.Header style={{ backgroundColor: "rgb(220, 222, 224)" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            Request a cab
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm
            submitHandler={this.submitHandler}
            CABREQUESTINPUTS={this.props.CABREQUESTINPUTS}
            CABREQUESTCREATOR={this.props.CABREQUESTCREATOR}
            cabrequestInputs={this.props.cabrequestInputs}
          />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgb(220, 222, 224)" }}>
          <div>{this.props.reqSuccessMsg}</div>
          <Button
            variant="outline-dark"
            onClick={() => window.location.reload()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const ModalForm = props => {
  var datePickerId = new Date().toISOString().split("T")[0];
  return (
    <Form
      onSubmit={event => props.CABREQUESTCREATOR(event, props.cabrequestInputs)}
    >
      <Form.Group controlId="formBasicEmployeeID">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control
          onChange={props.CABREQUESTINPUTS}
          name="employee_Id"
          type="text"
          placeholder="Enter employee ID"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Pickup Location</Form.Label>
        <Form.Control
          as="select"
          name="pickup_Location"
          onChange={props.CABREQUESTINPUTS}
        >
          <option value="" disabled selected hidden>
            Select Location
          </option>
          <option value="Gachibowli">Gachibowli</option>
          <option value="Kukatpally">Kukatpally</option>
          <option value="Hitech City">Hitech City</option>
          <option value="Tolichowki">Tolichowki</option>
          <option value="Raidurg">Raidurg</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicfromdate">
        <Form.Label>From</Form.Label>
        <Form.Control
          onChange={props.CABREQUESTINPUTS}
          type="date"
          name="from_Date"
          min={datePickerId}
          max="2050-12-31"
        />
      </Form.Group>
      <Form.Group controlId="todate">
        <Form.Label>To</Form.Label>
        <Form.Control
          onChange={props.CABREQUESTINPUTS}
          type="date"
          name="to_Date"
          min={datePickerId}
          max="2050-12-31"
        />
      </Form.Group>
      <Form.Group controlId="formBasicpickuptime">
        <Form.Label>Shift Time (HH:MM AM/PM)</Form.Label>
        <Form.Control
          onChange={props.CABREQUESTINPUTS}
          type="time"
          name="shift_Time"
          placeholder="Enter pickup time"
        />
      </Form.Group>

      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    modalShow: state.EmployeeReducer.modalShow,
    cabrequestInputs: state.EmployeeReducer.cabrequestInputs,
    reqSuccessMsg: state.EmployeeReducer.reqSuccessMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CABREQUESTMODAL: value => {
      dispatch(CABREQUESTMODAL(value));
    },
    CABREQUESTINPUTS: event => {
      event.preventDefault();
      const name = event.target.name;
      const value = event.target.value;
      dispatch(CABREQUESTINPUTS(name, value));
    },
    CABREQUESTCREATOR: (event, cabrequestInputs) => {
      dispatch(CABREQUESTCREATOR(event, cabrequestInputs));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
