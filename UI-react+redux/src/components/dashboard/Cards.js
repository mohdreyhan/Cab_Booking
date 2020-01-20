import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Badge,
  Modal
} from "react-bootstrap";
import { CABREQUESTMODAL } from "../../actions/Actions.js";
import { VIEWCABS } from "../../actions/ActionCreators.js";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false
    };
  }

  handleModal = value => {
    this.props.VIEWCABS(localStorage.getItem("emp_id"));
    this.setState({
      modalShow: value
    });
  };
  render() {
    const { carddata } = this.props;
    var status = carddata[0] ? carddata[0].status : "NA";
    console.log(carddata);
    return (
      <Container>
        <Row style={{ marginTop: 10 }}>
          <Col sm={4}>
            <Card style={{ width: "18rem", backgroundColor: "#dcdee0" }}>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <Image
                  src={require("../../images/taxi.png")}
                  style={{ height: 100, width: 100 }}
                />
              </Card.Title>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.5rem"
                }}
              >
                <Button
                  variant="outline-dark"
                  onClick={() => this.props.CABREQUESTMODAL(true)}
                  disabled={
                    status === "Pending" || status === "Aprroved" ? true : false
                  }
                >
                  Request Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ width: "18rem", backgroundColor: "#dcdee0" }}>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <Image
                  src={require("../../images/hourglass.png")}
                  style={{ height: 100, width: 100 }}
                />
              </Card.Title>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.5rem"
                }}
              >
                <Badge
                  style={{ fontSize: "15px", padding: "13px" }}
                  variant="dark"
                >
                  {" "}
                  Status : {status}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ width: "18rem", backgroundColor: "#dcdee0" }}>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <Image
                  src={require("../../images/audit.png")}
                  style={{ height: 100, width: 100 }}
                />
              </Card.Title>
              <Card.Body
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.5rem"
                }}
              >
                <Button
                  variant="outline-dark"
                  onClick={() => this.handleModal(!this.state.modalShow)}
                  disabled={
                    status === "Pending" || status === "Aprroved" || status === "NA" ? true : false
                  }
                >
                  View Cab Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <CabDetails
          modalShow={this.state.modalShow}
          handleModal={this.handleModal}
          viewcabs={this.props.viewcabs}
        />
      </Container>
    );
  }
}

const CabDetails = props => {
  return (
    <Modal show={props.modalShow}>
      <Modal.Header>
        <Modal.Title>Cab Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Trip ID : {props.viewcabs[0] ? props.viewcabs[0].trip_id : ""}</p>
        <p>Employee ID : {props.viewcabs[0] ? props.viewcabs[0].emp_id : ""}</p>
        <p>
          Pickup Location :{" "}
          {props.viewcabs[0] ? props.viewcabs[0].pickup_location : ""}
        </p>
        <p>From : {props.viewcabs[0] ? props.viewcabs[0].from_date : ""}</p>
        <p>To : {props.viewcabs[0] ? props.viewcabs[0].to_date : ""}</p>
        <p>
          Pickup Time : {props.viewcabs[0] ? props.viewcabs[0].pickup_time : ""}
        </p>
        <p>Cab No. : {props.viewcabs[0] ? props.viewcabs[0].cab_no : ""}</p>
        <div
          style={{
            backgroundColor: "#c3c4c7",
            padding: 10,
            borderRadius: 10
          }}
        >
          <p>
            Driver Name :{" "}
            {props.viewcabs[0] ? props.viewcabs[0].driver_name : ""}
          </p>
          <p>
            Driver Phone :{" "}
            {props.viewcabs[0] ? props.viewcabs[0].driver_phno : ""}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => props.handleModal(!props.modalShow)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
function mapStateToProps(state) {
  return {
    viewcabs: state.EmployeeReducer.viewcabs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CABREQUESTMODAL: value => {
      dispatch(CABREQUESTMODAL(value));
    },
    VIEWCABS: emp_id => {
      dispatch(VIEWCABS(emp_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
