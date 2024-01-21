const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


// Database connection
const {connection} = require("../config/config.db");


// Post user

const postUser = (request, response) => {
  const { user_name, email, password } = request.body;
  connection.query(
    "INSERT INTO users(user_name, email, password) VALUES (?,?,?)",
    [user_name, email, password],
    (error, results) => {
      if (error) {
        return response.status(500).json({ error: " Server Error. User could not be added" });
      }
      response
        .status(201)
        .json({ message: "User added successfully", userId: results.insertId });
    }
  );
};

// Route
app.route("/users").post(postUser);


// Delete user
const delUser = (request, response) => {
  const id = request.params.id;
  connection.query(
    "Delete from users where id = ?",
    [id],
    (error, results) => {
      if (error){
        return response.status(500).json({ error: " Server Error. User could not be added" });
      };
      response
        .status(201)
        .json({ "User removed successfully": results.affectedRows });
    }
  );
};

// Route
app.route("/users/:id").delete(delUser);


module.exports = app;
