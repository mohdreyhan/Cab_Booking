import { combineReducers } from "redux";
import LoginReducer from "../reducer/LoginReducer.js";
import EmployeeReducer from "../reducer/EmployeeReducer.js";
import ManagerReducer from "../reducer/ManagerReducer.js";
import AdminReducer from "../reducer/AdminReducer.js";

export default combineReducers({
  LoginReducer: LoginReducer,
  EmployeeReducer : EmployeeReducer,
  ManagerReducer :ManagerReducer,
  AdminReducer :AdminReducer
});
