import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Tabs, Tab, Modal, Button, Form } from "react-bootstrap";

import AddCab from "./AddCab";
import CabDetails from "./CabDetails";
import UpdateCab from "./UpdateCab";

class ManageCabs extends Component {
  render() {
    return (
      <Container>
        <Tabs
          style={{ marginTop: 10, borderRadius: 30 }}
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="tab"
        >
          <Tab eventKey="profile" title="Cab Details">
            <CabDetails />
          </Tab>
          <Tab eventKey="home" title="Add Cab">
            <AddCab />
          </Tab>
          <Tab eventKey="contact" title="Update Cab">
            <UpdateCab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCabs);
