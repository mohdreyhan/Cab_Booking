import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Table,
  Button,
  Form,
  Spinner,
  Modal,
  Col
} from "react-bootstrap";
import {
  APPROVEREJECTCREATOR,
  ASSIGNCABCREATOR,
  VIEWCABS
} from "../../actions/ActionCreators";
import { ASSIGNCABINPUTS } from "../../actions/Actions";

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      modalShow: false
    };
  }

  handleApprove = (value, emp_Id) => {
    this.setState({
      spinner: true
    });
    this.props.APPROVEREJECTCREATOR(value, emp_Id);
    setTimeout(() => {
      if (this.props.status !== "") {
        this.setState({
          spinner: false
        });
        window.location.reload();
      }
    }, 1000);
  };

  handleModal = value => {
    this.setState({
      modalShow: value
    });
    this.props.VIEWCABS("modal");
  };
  render() {
    return (
      <Container>
        {(() => {
          var role = localStorage.getItem("role");
          if (role === "admin") {
            return (
              <div>
                <Table hover striped responsive style={{ marginTop: 10 }}>
                  <TableHeader />
                  <TableBody
                    viewRequests={this.props.viewRequests}
                    handleApprove={this.handleApprove}
                    status={this.props.status}
                    handleModal={this.handleModal}
                  />
                </Table>
                <Modal show={this.state.modalShow}>
                  <Modal.Header>
                    <Modal.Title>Assign Cab</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      ref="form"
                      onSubmit={event =>
                        this.props.ASSIGNCABCREATOR(
                          event,
                          this.props.assigncab_inputs,
                          this.refs.form
                        )
                      }
                    >
                      <AssignModal
                        handleModal={this.handleModal}
                        ASSIGNCABINPUTS={this.props.ASSIGNCABINPUTS}
                        viewcabs={this.props.viewcabs}
                        assigncab_inputs={this.props.assigncab_inputs}
                      />
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <p>{this.props.assigncabsuccMsg}</p>
                    <Button
                      variant="secondary"
                      onClick={() => window.location.reload()}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                {(() => {
                  if (this.state.spinner === true) {
                    return (
                      <center>
                        <Spinner animation="border" />
                      </center>
                    );
                  }
                })()}
              </div>
            );
          }
        })()}
        <center>
          {this.props.viewRequests.length > 0 &&
          this.props.viewRequests[0].status === "Pending" ? (
            ""
          ) : (
            <p>No Rejected Requests</p>
          )}
        </center>
      </Container>
    );
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Request ID</th>
        <th>Employee ID</th>
        <th>Pickup Location</th>
        <th>From</th>
        <th>To</th>
        <th>Shift Time</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  var filteredRequests = props.viewRequests.filter(
    item => item.status === "Approved"
  );
  const rows = filteredRequests.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.request_Id}</td>
        <td>{row.emp_Id}</td>
        <td>{row.pickup_Location}</td>
        <td>{row.from_Date}</td>
        <td>{row.to_Date}</td>
        <td>{row.shift_Time}</td>
        <td>
          <Button
            style={{ margin: 5 }}
            variant="outline-dark"
            onClick={() => props.handleModal(true)}
          >
            Assign cab
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => props.handleApprove("Rejected", row.emp_Id)}
          >
            Reject
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const AssignModal = props => {
  var datePickerId = new Date().toISOString().split("T")[0];

  var cabs = props.viewcabs.filter(
    item => item.pickup_location === props.assigncab_inputs.pickup_location
  );
  return (
    <div>
      <Form.Group controlId="formBasicEmployeeID">
        <Form.Label>Request ID</Form.Label>
        <Form.Control
          name="request_id"
          type="text"
          placeholder="Enter request ID"
          onChange={props.ASSIGNCABINPUTS}
        />

        <Form.Group>
          <Form.Label>Pickup Location</Form.Label>
          <Form.Control
            as="select"
            name="pickup_location"
            onChange={props.ASSIGNCABINPUTS}
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
      </Form.Group>
      <Form.Group controlId="formBasicpickuptime">
        <Form.Label>Pick Up Time (HH:MM AM/PM)</Form.Label>
        <Form.Control
          type="time"
          name="pickup_time"
          placeholder="Enter pickup time"
          onChange={props.ASSIGNCABINPUTS}
        />
      </Form.Group>
      {(() => {
        if (cabs.length !== 0) {
          return (
            <Form.Group>
              <Form.Label>Cab No.</Form.Label>
              <Form.Control
                as="select"
                name="cab_no"
                onChange={props.ASSIGNCABINPUTS}
              >
                <option value="" disabled selected >
                  Select Cab
                </option>
                {cabs.map(item => {
                  return <option value={item.cab_no}>{item.cab_no}</option>;
                })}
              </Form.Control>
            </Form.Group>
          );
        } else {
          return (
            <Form.Group>
              <Form.Label>Cab No.</Form.Label>
              <Form.Control
                type="text"
                name="cab_no"
                onChange={props.ASSIGNCABINPUTS}
                placeholder="Enter Cab number"
              />
            </Form.Group>
          );
        }
      })()}

      <Form.Group>
        <Form.Label>Driver Name</Form.Label>
        <Form.Control
          type="text"
          name="driver_name"
          onChange={props.ASSIGNCABINPUTS}
          placeholder="Enter Name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Driver Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="driver_phno"
          placeholder="Enter Phone Number"
          onChange={props.ASSIGNCABINPUTS}
        />
      </Form.Group>
      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    viewRequests: state.AdminReducer.viewRequests,
    status: state.AdminReducer.status,
    assigncab_inputs: state.AdminReducer.assigncab_inputs,
    assigncabsuccMsg: state.AdminReducer.assigncabsuccMsg,
    viewcabs: state.EmployeeReducer.viewcabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    APPROVEREJECTCREATOR: (value, emp_id) => {
      dispatch(APPROVEREJECTCREATOR(value, emp_id));
    },
    ASSIGNCABINPUTS: event => {
      const name = event.target.name;
      const value = event.target.value;
      dispatch(ASSIGNCABINPUTS(name, value));
    },
    ASSIGNCABCREATOR: (event, assigncab_inputs, form) => {
      event.preventDefault();
      dispatch(ASSIGNCABCREATOR(event, assigncab_inputs, form));
    },
    VIEWCABS: value => {
      dispatch(VIEWCABS(value));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
