const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


// Database connection
const {connection} = require("../config/config.db");

// Register vote

const registerVote = (request, response) => {
  const { user_id, thing_id } = request.body;
  connection.query(
    "INSERT INTO votes (user_id, thing_id) VALUES (?,?)",
    [user_id, thing_id],
    (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          return response.status(400).json({ error: "User has already voted for this thing" });
        } else {
          console.error("Error registering vote:", error);
          return response.status(500).json({ error: "Server Error. Vote could not be registered" });
        }
      }     
      return response
        .status(201)
        .json({ message: "Vote registered successfully", results});
    }
  );
};

// Route
app.route("/vote").post(registerVote);


// Verify if an user has voted a thing
const getVoted = (request, response) => {
    
  const { user_id, thing_id } = request.query;

    connection.query(
      "SELECT COUNT(*) AS count FROM votes WHERE user_id = ? AND thing_id = ?",
      [user_id, thing_id],
      (error, results) => {
          if (error) {        
              return response.status(500).json({ error: " Server Error. Could not retrieve if user has voted" });
          }
         
          const hasVoted = results[0].count > 0;
          response.json({hasVoted});
      }
    );
  }
  
  // Route
  app.route("/hasvoted").get(getVoted);




module.exports = app;