import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Button, Form } from "react-bootstrap";
import { VIEWCABREQUESTS } from "../../actions/ActionCreators";

class Rejected extends Component {
  render() {
    return (
      <Container>
        {(() => {
          var role = localStorage.getItem("role");
          if (role === "admin") {
            return (
              <Table hover striped responsive style={{ marginTop: 10 }}>
                <TableHeader />
                <TableBody viewRequests={this.props.viewRequests} />
              </Table>
            );
          }
        })()}
        <center>
          {this.props.viewRequests.length > 0 &&
          this.props.viewRequests[0].status === "Rejected" ? (
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
        <th>From</th>
        <th>To</th>
        <th>Shift Time </th>
        <th>Status</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  var filteredRequests = props.viewRequests.filter(
    item => item.status === "Rejected"
  );
  const rows = filteredRequests.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.request_Id}</td>
        <td>{row.emp_Id}</td>
        <td>{row.from_Date}</td>
        <td>{row.to_Date}</td>
        <td>{row.shift_Time}</td>
        <td>{row.status}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};
function mapStateToProps(state) {
  return {
    viewRequests: state.ManagerReducer.viewRequests
  };
}

function mapDispatchToProps(dispatch) {
  return {
   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rejected);
