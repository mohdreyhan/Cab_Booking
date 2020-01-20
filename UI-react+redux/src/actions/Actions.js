import { LOGIN_INPUTS, LOGIN_SUCCESS } from "./Types.js";
import { LOGOUT_SUCCESS } from "./Types.js";
import { CABREQUEST_MODAL, CAB_REQUESTINPUTS, CAB_REQUEST } from "./Types.js";
import { DSPLAY_CARD } from "./Types.js";
import { VIEW_REQUESTS, APPROVE_REJECT } from "./Types";
import { ADDCAB_SUCCESS, ADDCAB_INPUTS } from "./Types";
import { MASTER_CABDETAILS } from "./Types";
import { UPDATECAB_INPUTS, UPDATE_MASTERCABS, DELETE_CABSUCC } from "./Types";
import { ASSIGNCAB_INPUTS, ASSIGNCAB_SUCC } from "./Types";
import { VIEWCAB_DETAILS } from "./Types";
import { SAMPLE_ACTION } from "./Types";

/*-------------------------------LOGIN-------------------------*/

export const LOGININPUTS = (name, value) => {
  return {
    type: LOGIN_INPUTS,
    payload: { name, value }
  };
};

export const LOGINSUCCESS = message => {
  return {
    type: LOGIN_SUCCESS,
    payload: message
  };
};

/*-------------------------------LOGOUT-------------------------*/

export const LOGOUTSUCCESS = message => {
  return {
    type: LOGOUT_SUCCESS,
    payload: message
  };
};

/*-------------------------------EMPLOYEE-------------------------*/

export const CABREQUESTMODAL = value => {
  return {
    type: CABREQUEST_MODAL,
    payload: value
  };
};

export const CABREQUESTINPUTS = (name, value) => {
  return {
    type: CAB_REQUESTINPUTS,
    payload: { name, value }
  };
};

export const CABREQUEST = message => {
  return {
    type: CAB_REQUEST,
    payload: message
  };
};

export const DSPLAYCARD = res => {
  return {
    type: DSPLAY_CARD,
    payload: res
  };
};

/*-------------------------------MANAGER-------------------------*/

export const VIEWREQUESTS = res => {
  return {
    type: VIEW_REQUESTS,
    payload: res
  };
};

export const APPROVEREJECT = res => {
  return {
    type: APPROVE_REJECT,
    payload: res
  };
};

/*-------------------------------ADMIN-------------------------*/

export const ADDCABINPUTS = (name, value) => {
  return {
    type: ADDCAB_INPUTS,
    payload: { name, value }
  };
};

export const ADDCABSUCCESS = message => {
  return {
    type: ADDCAB_SUCCESS,
    payload: message
  };
};

export const MASTERCABDETAILS = res => {
  return {
    type: MASTER_CABDETAILS,
    payload: res
  };
};

export const UPDATECABINPUTS = (name, value) => {
  return {
    type: UPDATECAB_INPUTS,
    payload: { name, value }
  };
};

export const UPDATEMASTERCABS = message => {
  return {
    type: UPDATE_MASTERCABS,
    payload: message
  };
};

export const DELETECABSUCC = message => {
  return {
    type: DELETE_CABSUCC,
    payload: message
  };
};

export const ASSIGNCABINPUTS = (name, value) => {
  return {
    type: ASSIGNCAB_INPUTS,
    payload: { name, value }
  };
};

export const ASSIGNCABSUCC = message => {
  return {
    type: ASSIGNCAB_SUCC,
    payload: message
  };
};

/*-------------------------------COMMON-------------------------*/

export const VIEWCABDETAILS = res => {
  return {
    type: VIEWCAB_DETAILS,
    payload: res
  };
};
