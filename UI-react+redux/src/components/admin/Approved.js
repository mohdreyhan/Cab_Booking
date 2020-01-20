import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Button, Form, Spinner } from "react-bootstrap";
import { APPROVEREJECTCREATOR } from "../../actions/ActionCreators";

class Approved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  handleReject = (value, emp_Id) => {
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
                    handleReject={this.handleReject}
                    status={this.props.status}
                  />
                </Table>
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
          this.props.viewRequests[0].status === "Approved" ? (
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
        <th>Shift Time</th>
        <th>Action</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  var filteredRequests = props.viewRequests.filter(
    item => item.status === "Assigned"
  );
  const rows = filteredRequests.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.request_Id}</td>
        <td>{row.emp_Id}</td>
        <td>{row.from_Date}</td>
        <td>{row.to_Date}</td>
        <td>{row.shift_Time}</td>
        <td>
          <Button onClick={() => props.handleReject("Rejected", row.emp_Id)}>
            Reject
          </Button>
        </td>
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
    APPROVEREJECTCREATOR: (value, emp_id) => {
      dispatch(APPROVEREJECTCREATOR(value, emp_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Approved);
