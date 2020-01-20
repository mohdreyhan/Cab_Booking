import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Button } from "react-bootstrap";

import { ADMINVIEWCABDETAILS } from "../../../actions/ActionCreators";

class CabDetails extends Component {
  componentDidMount() {
    this.props.ADMINVIEWCABDETAILS();
  }
  render() {
    return (
      <Container>
        <Table hover striped responsive style={{ marginTop: 10 }}>
          <TableHeader />
          <TableBody cabdetails={this.props.cabdetails} />
        </Table>
      </Container>
    );
  }
}

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
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

function mapStateToProps(state) {
  return {
    cabdetails: state.AdminReducer.cabdetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ADMINVIEWCABDETAILS: () => {
      dispatch(ADMINVIEWCABDETAILS());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CabDetails);
