import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, Button, Form, Spinner } from "react-bootstrap";
import { APPROVEREJECTCREATOR } from "../../actions/ActionCreators";

class Pending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
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

  render() {
    return (
      <Container>
        {(() => {
          var role = localStorage.getItem("role");
          if (role === "employee/manager") {
            return (
              <div>
                <Table hover striped responsive style={{ marginTop: 10 }}>
                  <TableHeader />
                  <TableBody
                    viewRequests={this.props.viewRequests}
                    handleApprove={this.handleApprove}
                    status={this.props.status}
                  />
                </Table>
                <center>
                  {this.props.viewRequests.length === 0 ? (
                    <p>No Pending Requests</p>
                  ) : (
                    ""
                  )}
                </center>
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
    item => item.status === "Pending"
  );
  const rows = filteredRequests.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.request_Id}</td>
        <td>{row.emp_Id}</td>
        <td>{row.from_Date}</td>
        <td>{row.to_Date}</td>
        <td>{row.pickup_Time}</td>
        <td>
          <Button
            style={{ marginRight: 5 }}
            onClick={() => props.handleApprove("Approved", row.emp_Id)}
          >
            Approve
          </Button>
          <Button onClick={() => props.handleApprove("Rejected", row.emp_Id)}>
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
    viewRequests: state.ManagerReducer.viewRequests,
    status: state.ManagerReducer.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    APPROVEREJECTCREATOR: (value, emp_id) => {
      dispatch(APPROVEREJECTCREATOR(value, emp_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
