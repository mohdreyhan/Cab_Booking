import { LOGINSUCCESS, LOGOUTSUCCESS } from "./Actions";
import { CABREQUEST } from "./Actions";
import { DSPLAYCARD } from "./Actions";
import { VIEWREQUESTS, APPROVEREJECT } from "./Actions";
import { ADDCABSUCCESS, MASTERCABDETAILS } from "./Actions";
import { UPDATEMASTERCABS, DELETECABSUCC } from "./Actions";
import { ASSIGNCABSUCC, VIEWCABDETAILS } from "./Actions";
/*---------------------------LOGIN-------------------------------*/

export const USERLOGIN = (event, form, loginInputs, history) => dispatch => {
  event.preventDefault();
  var role;
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginInputs)
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        if (
          response.role === "admin" ||
          response.role === "employee/manager" ||
          response.role === "employee"
        ) {
          localStorage.setItem("role", response.role);
          role = localStorage.getItem("role");
          localStorage.setItem("email", response.email);
          localStorage.setItem("token", response.token);
          localStorage.setItem("emp_id", response.emp_id);
          localStorage.setItem("name", response.name);
        }

        if (role === "") {
          return history.replace({
            pathname: "/"
          });
        } else if (role === "employee/manager") {
          return history.replace({ pathname: "/dashboard" });
        } else if (role === "employee") {
          return history.replace({
            pathname: "/dashboard"
          });
        } else if (role === "admin") {
          return history.replace({ pathname: "/dashboard" });
        }
      } else if (response.status === 401) {
        dispatch(LOGINSUCCESS(response.message));
        form.reset();
      } else if (response.status === 400) {
        dispatch(LOGINSUCCESS(response.message));
        form.reset();
      } else {
        const message =
          response.message !== undefined
            ? response.message
            : "Unknown error recevied";
        dispatch(LOGINSUCCESS(message));
      }
    });
};

/*---------------------------LOGOUT-------------------------------*/

export const USERLOGOUT = (email, history) => dispatch => {
  return fetch("http://localhost:3000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        localStorage.clear();
        if (localStorage.length === 0) {
          history.replace("/");
        }
        dispatch(LOGOUTSUCCESS(response.message));
      }
    });
};

/*---------------------------CAB REQUEST-------------------------------*/

export const CABREQUESTCREATOR = (event, cabrequestInputs) => dispatch => {
  event.preventDefault();
  return fetch("http://localhost:3000/cabrequests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cabrequestInputs)
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(CABREQUEST(response.message));
      } else if (response.status === 400) {
        dispatch(CABREQUEST(response.message));
      }
    });
};

/*---------------------------CARDDATA-------------------------------*/

export const CARDDATA = emp_id => dispatch => {
  return fetch("http://localhost:3000/carddata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emp_id: emp_id
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(DSPLAYCARD(response.results));
      }
    });
};

/*---------------------------VIEW CAB REQUEST-------------------------------*/

export const VIEWCABREQUESTS = value => dispatch => {
  return fetch("http://localhost:3000/viewrequests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ value })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(VIEWREQUESTS(response.results));
      }
    });
};

/*---------------------------APPROVE/REJECT-------------------------------*/

export const APPROVEREJECTCREATOR = (value, emp_Id) => dispatch => {
  return fetch("http://localhost:3000/approvereject/" + value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ emp_Id: emp_Id })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(APPROVEREJECT(response.res));
      }
    });
};

/*---------------------------ADDCAB-------------------------------*/

export const ADDCAB = (addcab_Inputs, event, form) => dispatch => {
  event.preventDefault();
  return fetch("http://localhost:3000/addcab", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(addcab_Inputs)
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        form.reset();
        dispatch(ADDCABSUCCESS(response.message));
      }
    });
};

/*---------------------------ADMINVIEWCABDETAILS-------------------------------*/

export const ADMINVIEWCABDETAILS = () => dispatch => {
  return fetch("http://localhost:3000/cabdetails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(MASTERCABDETAILS(response.results));
      }
    });
};

/*---------------------------UPDATECABDETAILS-------------------------------*/

export const UPDATECABDETAILS = (
  updatecab_Inputs,
  event,
  form,
  cab_id
) => dispatch => {
  event.preventDefault();
  return fetch("http://localhost:3000/updatedetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ updatecab_Inputs, cab_id })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        form.reset();
        dispatch(UPDATEMASTERCABS(response.message));
      }
    });
};

/*---------------------------DELETECAB-------------------------------*/

export const DELETECAB = cab_id => dispatch => {
  return fetch("http://localhost:3000/deletecabs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cab_id: cab_id })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        window.location.reload();
        dispatch(DELETECABSUCC(response.message));
      }
    });
};

/*---------------------------ASSIGNCAB-------------------------------*/

export const ASSIGNCABCREATOR = (event, assigncab_inputs, form) => dispatch => {
  event.preventDefault();
  return fetch("http://localhost:3000/assigncab", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(assigncab_inputs)
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        form.reset();
        dispatch(ASSIGNCABSUCC(response.message));
      } else if (response.status === 400) {
        dispatch(ASSIGNCABSUCC(response.message));
      }
    });
};

/*---------------------------VIEWCABDETAILS-------------------------------*/

export const VIEWCABS = emp_id => dispatch => {
  return fetch("http://localhost:3000/viewcabs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ emp_id: emp_id })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(VIEWCABDETAILS(response.results));
      }
    });
};
