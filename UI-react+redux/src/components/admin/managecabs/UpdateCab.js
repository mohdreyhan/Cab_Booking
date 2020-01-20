import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col
} from "react-bootstrap";

import { UPDATECABINPUTS } from "../../../actions/Actions";
import { UPDATECABDETAILS, DELETECAB } from "../../../actions/ActionCreators";

class UpdateCab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      cab_id: "",
      cabdata: []
    };
  }

  handleModal = (value, cab_id) => {
    const cabdata = this.props.cabdetails.filter(
      item => item.cab_id === cab_id
    );
    this.setState({
      modalShow: value,
      cab_id: cab_id,
      cabdata: cabdata
    });
  };

  render() {
    return (
      <Container>
        <Table hover striped responsive style={{ marginTop: 10 }}>
          <TableHeader />
          <TableBody
            cabdetails={this.props.cabdetails}
            modalShow={this.state.modalShow}
            handleModal={this.handleModal}
            DELETECAB={this.props.DELETECAB}
          />
        </Table>
        <center>{this.props.deletesuccMsg}</center>
        <Modal show={this.state.modalShow}>
          <Modal.Header>
            <Modal.Title>Update cab details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form
              ref="form"
              style={{ marginTop: 10 }}
              onSubmit={event =>
                this.props.UPDATECABDETAILS(
                  this.props.updatecab_Inputs,
                  event,
                  this.refs.form,
                  this.state.cab_id
                )
              }
            >
              <UpdateForm
                UPDATECABINPUTS={this.props.UPDATECABINPUTS}
                cabdata={this.state.cabdata}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModal(!this.state.modalShow)}
            >
              Close
            </Button>
            <p>{this.props.updatesuccMsg}</p>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const UpdateForm = props => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Cab Id.</Form.Label>
        <Form.Control
          type="text"
          value={props.cabdata[0] ? props.cabdata[0].cab_id : ""}
          disabled={true}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cab No.</Form.Label>
        <Form.Control
          type="text"
          placeholder={props.cabdata[0] ? props.cabdata[0].cab_no : ""}
          onChange={props.UPDATECABINPUTS}
          name="cab_no"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Provider</Form.Label>
        <Form.Control
          type="text"
          placeholder={props.cabdata[0] ? props.cabdata[0].provider : ""}
          onChange={props.UPDATECABINPUTS}
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
                onChange={props.UPDATECABINPUTS}
                name="from_contract_period"
                placeholder="dsdsd"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>To</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter email"
                onChange={props.UPDATECABINPUTS}
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
          onChange={props.UPDATECABINPUTS}
          name="capacity"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Driver Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={props.UPDATECABINPUTS}
          name="driver_name"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Driver Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Number"
          onChange={props.UPDATECABINPUTS}
          name="driver_phno"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        update
      </Button>
    </div>
  );
};

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Cab ID</th>
        <th>Cab No</th>
        <th>Provider</th>
        <th>From : Contract Period </th>
        <th>To : Contract Period </th>
        <th>Capacity</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.cabdetails.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.cab_id}</td>
        <td>{row.cab_no}</td>
        <td>{row.provider}</td>
        <td>{row.from_contract_period}</td>
        <td>{row.to_contract_period}</td>
        <td>{row.capacity}</td>
        <td>
          <Button
            variant="outline-dark"
            onClick={() => props.handleModal(!props.modalShow, row.cab_id)}
            style={{ margin: 5 }}
          >
            Update{" "}
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => props.DELETECAB(row.cab_id)}
          >
            Delete{" "}
          </Button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

function mapStateToProps(state) {
  return {
    cabdetails: state.AdminReducer.cabdetails,
    updatecab_Inputs: state.AdminReducer.updatecab_Inputs,
    updatesuccMsg: state.AdminReducer.updatesuccMsg,
    deletesuccMsg: state.AdminReducer.deletesuccMsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    UPDATECABINPUTS: event => {
      const name = event.target.name;
      const value = event.target.value;
      dispatch(UPDATECABINPUTS(name, value));
    },
    UPDATECABDETAILS: (updatecab_Inputs, event, form, cab_id) => {
      dispatch(UPDATECABDETAILS(updatecab_Inputs, event, form, cab_id));
    },
    DELETECAB: cab_id => {
      dispatch(DELETECAB(cab_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCab);
