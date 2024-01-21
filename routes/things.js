const express = require("express");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const upload = multer({ dest: "uploads/" });

// Database connection
const {connection} = require("../config/config.db");

// Get all things
const getAllThings = (request, response) => {
  connection.query("SELECT * FROM things", (error, results) => {
    if (error) {        
        return response.status(500).json({ error: " Server Error. Could not retrieve all things" });
    }
    response.status(200).json(results);
  });
};

// Route
app.route("/things").get(getAllThings);


// Post a thing
const postThing = (request, response) => {
  const { user_name, description} = request.body;
  const imgPath = saveImage(request.file);
  const imgName = request.file.originalname;
  connection.query(
    "INSERT INTO things(user_name, img_name, description) VALUES (?,?,?)",
    [user_name, imgName, description],
    (error, results) => {
      if (error) {
        return response.status(500).json({ error: "Internal Server Error" });
      }
      response
        .status(201)
        .json({ message: "Thing added successfully", thing_id: results.insertId });
    }
  );
};

function saveImage(file) {
  const newPath = `./img_uploads/${file.originalname}`;
  fs.renameSync(file.path, newPath);
  return newPath; 
}

// Route
app.route("/things").post(upload.single("image"), postThing);

// Delete thing
const delThing = (request, response) => {
  const id = request.params.id;
  connection.query(
    "Delete from things where id = ?",
    [id],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not delete thing" });
        }
        response
        .status(201)
        .json({ "Thing removed successfully": results.affectedRows });
    }
  );
};

// Route
app.route("/things/:id").delete(delThing);

module.exports = app;