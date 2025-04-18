const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


// Database connection
const { dbQuery } = require("../config/config.db");


// Register vote
const registerVote = (request, response) => {
  const { user_id, thing_id, value } = request.body;
  dbQuery(
    "INSERT INTO votes (user_id, thing_id, value) VALUES (?,?,?)",
    [user_id, thing_id, value],
    (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          dbQuery(
            "UPDATE votes SET value = ? WHERE user_id = ? AND thing_id = ?",
            [value, user_id, thing_id],
            (error, results) => {
              if (error){
                console.error("Error updating vote:", error);
                return response.status(500).json({ error: "Server Error. Vote could not be updated" });
              }
              else return response
              .status(201)
              .json({ message: "Vote updated successfully", results});
            }
          )
        } else {
          console.error("Error registering vote:", error);
          return response.status(500).json({ error: "Server Error. Vote could not be registered" });
          }
      }  else return response
              .status(201)
              .json({ message: "Vote registered successfully", results});
    }
  );
};

// Route
app.route("/vote").post(registerVote);


// Verify if an user has voted a thing and return the value voted (1, -1) or 0 if hasn't voted.
const hasUserVotedThing = (request, response) => {
    
  const { user_id, thing_id } = request.query;

  dbQuery(
    "SELECT COALESCE(value, 0) AS value FROM votes WHERE user_id = ? AND thing_id = ?",
    [user_id, thing_id],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not retrieve if user has voted", error });
        }
        const valueVoted = results[0] ? results[0].value : 0;
        response.json(valueVoted);
    }
  );
}
  
  // Route
  app.route("/hasUservotedThisThing").get(hasUserVotedThing);




module.exports = app;