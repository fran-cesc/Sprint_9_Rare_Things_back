const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


// Database connection
const { dbQuery } = require("../config/config.db");


// Register comment
const registerComment = (request, response) => {
  const { thing_id, user_id, comment } = request.body;
  dbQuery(
    "INSERT INTO comments (thing_id, user_id, comment ) VALUES (?,?,?)",
    [thing_id, user_id, comment],
    (error, results) => {
      if (error) {
          console.error("Error registering comment: ", error);
          return response.status(500).json({ error: "Server Error. Comment could not be registered" });
        }
         return response
        .status(201)
        .json({ message: "Comment registered successfully", results});
    }
  );
};

// Route
app.route("/comments").post(registerComment);


// Get comments by thing_id
const getCommentsByThingId = (request, response) => {
    const id = request.params.id;
    dbQuery(
      "SELECT comments.*, users.user_name FROM comments JOIN users ON comments.user_id = users.user_id WHERE thing_id = ? ORDER BY comments.date DESC",
      [id],
      (error, results) => {
          if (error) {        
              return response.status(500).json({ error: " Server Error. Could not retrieve comments" });
          }
          if (results.length === 0) { 
            console.log('There are no comments for this Thing');
            return response.status(200).json(results);
          }
          return response
          .status(200)
          .json(results);
      }
    );
  }
  
  // Route
  app.route("/comments/:id").get(getCommentsByThingId);

// Get comments by user_id
const getCommentsByUserId = (request, response) => {
    const id = request.params.id;
    dbQuery(
      "SELECT * from comments WHERE user_id = ?",
      [id],
      (error, results) => {
          if (error) {        
              return response.status(500).json({ error: " Server Error. Could not retrieve comments" });
          }
          if (results.length === 0) { 
            console.log('There are no comments for this user');
            return response.status(200).json(results);
          }
          return response
          .status(200)
          .json(results);
      }
    );
  }
  
  // Route
  app.route("/comments/user/:id").get(getCommentsByUserId);


module.exports = app;