const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


// Database connection
const {connection} = require("../config/config.db");


// Register user

const registerUser = (request, response) => {
  const { user_name, email, password } = request.body;
  console.log(request.body.value)
  console.log(request.body)
  connection.query(
    "INSERT INTO users(user_name, email, password) VALUES (?,?,?)",
    [user_name, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).json({ error: " Server Error. User could not be registered" });
      }
      response
        .status(201)
        .json({ message: "User registered successfully", userId: results.insertId });
    }
  );
};

// Route
app.route("/register").post(registerUser);

// User login

const logUser = (request, response) => {
  const { email, password } = request.body;
  debugger;
  connection.query(
    "SELECT user_name, email, password from users where email=?",
    [email],
    (error, results) => {
      if (error) {
        return response.status(500).json({ error: " Server Error. User could not be registered" });
      }
      
      if (results.length <= 0 || results[0].password != password ) {
        return response.status(401).json({ message: "Incorrect username or password"});
      }
      console.log(email);
      console.log(request.body);
      const accessToken = jwt.sign(request.body, process.env.ACCESS_TOKEN, {
        expiresIn: "2h",
      })
      return response
        .status(201)
        .json({token: accessToken, message: "User successfully logged in", userId: results.insertId});
    }
  );
};

//Route
app.route("/login").post(logUser);

// // Delete user
// const delUser = (request, response) => {
//   const id = request.params.id;
//   connection.query(
//     "Delete from users where id = ?",
//     [id],
//     (error, results) => {
//       if (error){
//         return response.status(500).json({ error: " Server Error. User could not be added" });
//       };
//       response
//         .status(201)
//         .json({ "User removed successfully": results.affectedRows });
//     }
//   );
// };

// // Route
// app.route("/users/:id").delete(delUser);


module.exports = app;
