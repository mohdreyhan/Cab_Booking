import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/login/Login.js";
import Dashboard from "./components/dashboard/Dashboard";
import NavbarPage from "./components/navbar/NavbarPage";
import TabsPage from "./components/manager/TabsPage";
import AdminTabs from "./components/admin/AdminTabs";
import ManageCabs from "./components/admin/managecabs/ManageCabs";


const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <NavbarPage />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/tabs" component={TabsPage} />
        <Route path="/admintabs" component={AdminTabs} />
        <Route path="/managecabs" component={ManageCabs} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
