import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Cards from "./Cards.js";
import NewRequest from "../newrequest/NewRequest.js";
import { CARDDATA } from "../../actions/ActionCreators.js";
class Dashboard extends Component {
  componentDidMount() {
    this.props.CARDDATA(localStorage.getItem("emp_id"));
  }
  render() {
    return (
      <Container>
        <div>
          <Cards carddata={this.props.carddata} />
          <NewRequest />
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    carddata: state.EmployeeReducer.carddata
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CARDDATA: (emp_id) => {
      dispatch(CARDDATA(emp_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
