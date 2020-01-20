var express = require("express");
var app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");

const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cab_booking"
});

app.post("/login", function(req, res) {
  const loginInputs = req.body;
  var role;
  var actualEmail;
  var emp_id;
  var name;
  connection.query(
    "select email, emp_id,role,name from users where email = ? and password = ?",
    [loginInputs.email, loginInputs.password],
    function(error, results, next) {
      if (results.length !== 0) {
        actualEmail = results[0].email;
        role = results[0].role;
        emp_id = results[0].emp_id;
        name = results[0].name;
        if (loginInputs.email === actualEmail) {
          let token;
          connection.query(
            "select token from users where email = ?",
            [loginInputs.email],
            function(error, results, next) {
              token = results;
            }
          );
          if (token === undefined) {
            token = new Date().getTime() + 557000;
            connection.query(
              "update users set token = ? where email = ?",
              [token, loginInputs.email],
              function(error, results, next) {}
            );
          } else if (token < new Date().getTime()) {
            res.send({
              status: 401,
              message: "Session expired"
            });
          }
          res.send({
            status: 200,
            message: "Login successfully",
            email: actualEmail,
            token: token,
            role: role,
            emp_id: emp_id,
            name: name
          });
        } else {
          res.send({
            status: 400,
            message: "Incorrect Password entered"
          });
        }
      } else {
        res.send({
          status: 400,
          message: "Incorrect Details"
        });
      }
    }
  );
});

app.post("/logout", function(req, res) {
  const email = req.body.email;
  connection.query(
    "SELECT email from users WHERE email = ? ",
    [email],
    function(error, results, next) {
      if (results.length !== 0) {
        const email = results[0].email;
        if (email !== undefined) {
          connection.query(
            "update users set token = ? where email = ?",
            [null, email],
            function(error, results, next) {
              if (error) {
                res.send({
                  status: 400,
                  message: "Incorrect Details"
                });
              } else {
                res.send({
                  status: 200,
                  message: "Logged out successfully"
                });
              }
            }
          );
        }
      }
    }
  );
});

app.post("/cabrequests", function(req, res) {
  const cabrequestInputs = req.body;
  var manager;
  var initialStatus = "Pending";
  var records = [
    [
      cabrequestInputs.employee_Id,
      cabrequestInputs.pickup_Location,
      cabrequestInputs.from_Date,
      cabrequestInputs.to_Date,
      cabrequestInputs.shift_Time
    ]
  ];
  connection.query(
    "select manager from users where emp_id = ?",
    [cabrequestInputs.employee_Id],
    function(error, results, next) {
      if (results[0].manager !== null) {
        manager = results[0].manager;
        records[0].push(manager);
        records[0].push(initialStatus);
        connection.query(
          "INSERT INTO cab_requests(emp_Id, pickup_Location, from_Date, to_Date, shift_Time,manager,status) VALUES  ?",
          [records],
          function(error, results, next) {
            if (error) {
              res.send({
                status: 400,
                message: "Incorrect data"
              });
            } else {
              res.send({
                status: 200,
                message: "Request Sent"
              });
            }
          }
        );
      } else {
        res.send({
          message: "Incorrect employee ID"
        });
      }
    }
  );
});

app.post("/carddata", function(req, res) {
  var emp_id = req.body.emp_id;
  connection.query(
    "select status from cab_requests where emp_Id = ?",
    [emp_id],
    function(error, results, next) {
      if (results === []) {
        res.send({
          message: "baigan"
        });
      } else {
        res.send({
          status: 200,
          results: results
        });
      }
    }
  );
});

app.post("/viewrequests", function(req, res) {
  var value = req.body.value;
  if (value === undefined) {
    connection.query("select * from cab_requests", function(
      error,
      results,
      next
    ) {
      if (results !== []) {
        res.send({
          status: 200,
          results: results
        });
      }
    });
  } else {
    connection.query(
      "select * from cab_requests where manager = ?",
      [value],
      function(error, results, next) {
        if (results !== []) {
          res.send({
            status: 200,
            results: results
          });
        }
      }
    );
  }
});

app.post("/approvereject/:value", function(req, res) {
  var emp_Id = req.body.emp_Id;
  const action = req.params.value;
  connection.query(
    "select status from cab_requests where emp_Id = ?",
    [emp_Id],
    function(error, results, next) {
      if (
        results !== [] &&
        results[0] !== undefined &&
        results[0].status !== undefined
      ) {
        if (results[0].status === "Pending") {
          connection.query(
            "update cab_requests set status = ? where emp_Id = ?",
            [action, emp_Id],
            function(error, results, next) {
              res.send({
                status: 200,
                res: "approved"
              });
            }
          );
        } else {
          connection.query(
            "update cab_requests set status = ? where emp_Id = ?",
            [action, emp_Id],
            function(error, results, next) {
              {
                res.send({
                  status: 200,
                  res: "Rejected"
                });
              }
            }
          );
        }
      }
    }
  );
});

app.post("/addcab", function(req, res) {
  const addcab_Inputs = req.body;
  const records = [
    [
      addcab_Inputs.cab_no,
      addcab_Inputs.provider,
      addcab_Inputs.from_contract_period,
      addcab_Inputs.to_contract_period,
      addcab_Inputs.capacity,
      addcab_Inputs.driver_name,
      addcab_Inputs.driver_phno
    ]
  ];
  connection.query(
    "INSERT INTO cab_details(cab_no, provider,from_contract_period,to_contract_period,capacity,driver_name,driver_phno) VALUES  ?",
    [records],
    function(error, results, next) {
      if (error) {
        res.send({
          status: 400,
          message: "Incorrect data"
        });
      } else {
        res.send({
          status: 200,
          message: "Cab added successfully"
        });
      }
    }
  );
});

app.get("/cabdetails", function(req, res) {
  connection.query("select * from cab_details", function(error, results, next) {
    if (error) {
      res.send({
        message: "Error"
      });
    } else {
      res.send({
        status: 200,
        results: results
      });
    }
  });
});

app.post("/updatedetails", function(req, res) {
  const updatecab_Inputs = req.body.updatecab_Inputs;
  const cab_id = req.body.cab_id;
  var db_cab_no,
    db_provider,
    db_from_contract_period,
    db_to_contract_period,
    db_capacity,
    db_driver_name,
    db_driver_phno;
  connection.query("select * from cab_details", function(error, results, next) {
    if (results.length !== 0) {
      (db_cab_no =
        updatecab_Inputs.cab_no === undefined
          ? results[0].cab_no
          : updatecab_Inputs.cab_no),
        (db_provider =
          updatecab_Inputs.provider === undefined
            ? results[0].provider
            : updatecab_Inputs.provider),
        (db_from_contract_period =
          updatecab_Inputs.from_contract_period === undefined
            ? results[0].from_contract_period
            : updatecab_Inputs.from_contract_period),
        (db_to_contract_period =
          updatecab_Inputs.to_contract_period === undefined
            ? results[0].to_contract_period
            : updatecab_Inputs.to_contract_period),
        (db_capacity =
          updatecab_Inputs.capacity === undefined
            ? results[0].capacity
            : updatecab_Inputs.capacity),
        (db_driver_name =
          updatecab_Inputs.driver_name === undefined
            ? results[0].driver_name
            : updatecab_Inputs.driver_name),
        (db_driver_phno =
          updatecab_Inputs.driver_phno === undefined
            ? results[0].driver_phno
            : updatecab_Inputs.driver_phno);
    }
    connection.query(
      "UPDATE cab_details SET cab_no = ? , provider = ? , from_contract_period = ? , to_contract_period = ? , capacity = ? , driver_name = ? , driver_phno = ?  where cab_id = ?",
      [
        db_cab_no,
        db_provider,
        db_from_contract_period,
        db_to_contract_period,
        db_capacity,
        db_driver_name,
        db_driver_phno,
        cab_id
      ],
      function(error, results, next) {
        if (error) {
          res.send({
            status: 400,
            message: "Incorrect data"
          });
        } else {
          res.send({
            status: 200,
            message: "Cab data updated successfully"
          });
        }
      }
    );
  });
});

app.post("/deletecabs", function(req, res) {
  const cab_id = req.body.cab_id;
  connection.query(
    "delete from cab_details where cab_id = ?",
    [cab_id],
    function(error, results, next) {
      if (error) {
        res.send({
          message: "baigan"
        });
      } else {
        res.send({
          status: 200,
          message: "Record deleted"
        });
      }
    }
  );
});

app.post("/assigncab", function(req, res) {
  const assigncab_Inputs = req.body;
  var capacity;
  var count;
  var from_Date, to_Date;
  const records = [
    [
      assigncab_Inputs.request_id,
      assigncab_Inputs.pickup_location,
      assigncab_Inputs.pickup_time,
      from_Date,
      to_Date,
      assigncab_Inputs.cab_no,
      assigncab_Inputs.driver_name,
      assigncab_Inputs.driver_phno
    ]
  ];
  connection.query(
    "select capacity from cab_details where cab_no =?",
    [assigncab_Inputs.cab_no],
    function(error, results, next) {
      if (results.length !== 0) {
        capacity = results[0].capacity;
        connection.query(
          "select count(cab_no) from trip_details where cab_no =?",
          [assigncab_Inputs.cab_no],
          function(error, results, next) {
            if (results.length !== 0) {
              count = results[0].cab_no;
              if (capacity !== count) {
                connection.query(
                  "select from_date, to_Date from cab_requests where request_Id = ?",
                  [assigncab_Inputs.request_id],
                  function(error, results, next) {
                    if (results.length !== 0) {
                      records[0][3] =
                        results[0] && results[0].from_Date
                          ? results[0].from_Date
                          : "";
                      records[0][4] =
                        results[0] && results[0].to_Date
                          ? results[0].to_Date
                          : "";
                      connection.query(
                        "INSERT INTO trip_details(request_id, pickup_location,from_date,to_date,pickup_time,cab_no,driver_name,driver_phno) VALUES  ?",
                        [records],
                        function(error, results, next) {
                          if (results !== undefined)
                            connection.query(
                              "update cab_requests set status = ? where request_id = ?",
                              ["Assigned", assigncab_Inputs.request_id],
                              function(error, results, next) {
                                res.send({
                                  status: 200,
                                  message: "Cab assigned successfully"
                                });
                              }
                            );
                        }
                      );
                    }
                  }
                );
              }
            }
          }
        );
      } else {
        res.send({
          status: 400,
          message: "Cab capacity is full"
        });
      }
    }
  );
});

app.post("/viewcabs", function(req, res) {
  const emp_id = req.body.emp_id;
  var req_id;
  if (emp_id === "modal") {
    connection.query("select * from trip_details", function(
      error,
      results,
      next
    ) {
      res.send({
        status: 200,
        results: results
      });
    });
  } else {
    connection.query(
      "select request_Id from cab_requests where emp_Id =?",
      [emp_id],
      function(error, results, next) {
        if (results !== []) {
          req_id = results[0] ? results[0].request_Id : "";
          connection.query(
            "select * from trip_details where request_id=?",
            [req_id],
            function(error, results, next) {
              if (results !== undefined) {
                res.send({
                  status: 200,
                  results: results
                });
              }
            }
          );
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log("Go to http://localhost:3000/posts to see posts");
});
