const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


// Database connection
const {connection} = require("../config/config.db");

// Get all users
const getAllUsers = (request, response) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {        
        return response.status(500).json({ error: " Server Error. Could not retrieve all users" });
    }
    response.status(200).json(results);
  });
};

// Route
app.route("/users").get(getAllUsers);

// Get user
const getUser = (request, response) => {
  const email = request.params.email;
  console.log(email);
  connection.query(
    "SELECT * from users WHERE email = ?",
    [email],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not retrieve user" });
        }
        if (results.length === 0) { 
          console.log(results);
          return response.status(200).json(results);
        }
        return response
        .status(200)
        .json(results[0]);
    }
  );
}

// Route
app.route("/users/:email").get(getUser);


// Register user
const registerUser = (request, response) => {
  const { user_name, email, password } = request.body;
  connection.query(
    "INSERT INTO users (user_name, email, password) VALUES (?,?,?)",
    [user_name, email, password],
    (error, results) => {
      if (error) {
        return response.status(500).json({ error: " Server Error. User could not be registered" });
      }
      return response
        .status(201)
        .json({ message: "User registered successfully"});
        // .json({ message: "User registered successfully", userId: results.insertId, user_name: results.user_name });
    }
  );
};

// Route
app.route("/register").post(registerUser);

// User login
const logUser = (request, response) => {
  const { email, password, user_name } = request.body;
  connection.query(
    "SELECT user_name, email, password from users where email=?",
    [email],
    (error, results) => {
      if (error) {
        return response.status(500).json({ error: " Server Error. User could not be registered" });
      }
      if (results.length <= 0 || results[0].password != password) {
        return response.status(401).json({ message: "Incorrect username or password"});
      }
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




module.exports = app;
