const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


// Database connection
const {connection} = require("../config/config.db");


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