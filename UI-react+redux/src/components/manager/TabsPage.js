import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Container } from "react-bootstrap";
import { VIEWCABREQUESTS } from "../../actions/ActionCreators";
import Approved from "./Approved.js";
import Pending from "./Pending.js";
import Rejected from "./Rejected.js";

class TabsPage extends Component {
  componentDidMount() {
    this.props.VIEWCABREQUESTS(localStorage.getItem("name"));
  }
  render() {
    return (
      <Container>
        <Tabs
        style = {{marginTop : 10, borderRadius : 30}}
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="tab"
        >
          <Tab eventKey="profile" title="Pending">
            <Pending />
          </Tab>
          <Tab eventKey="home" title="Approved">
            <Approved />
          </Tab>
          <Tab eventKey="contact" title="Rejected">
            <Rejected />
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
  return {
    VIEWCABREQUESTS: name => {
      dispatch(VIEWCABREQUESTS(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsPage);
