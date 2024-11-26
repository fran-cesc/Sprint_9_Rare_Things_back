const express = require("express");
const multer = require("multer");
const fs = require("node:fs");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const upload = multer({ dest: "img_uploads/" });

// Database connection
const { dbQuery } = require("../config/config.db");


// Get the 3 more recent things in upload order (last uploaded first)
const getRecentThings = (request, response) => {
  dbQuery("SELECT * FROM things ORDER BY date DESC LIMIT 3", [], (error, results) => {
    if (error) {        
        return response.status(500).json({ error: " Server Error. Could not retrieve recent things" });
    }
    response.status(200).json(results);
  });
};

// Route
app.route("/things/recent").get(getRecentThings);


// Get the 3 most voted things (most voted first)

const getMostVotedThings= (request, response) => {
  dbQuery("SELECT * FROM things ORDER BY votes DESC LIMIT 3", [], (error, results) => {
    if (error) {        
        return response.status(500).json({ error: " Server Error. Could not retrieve most voted things" });
    }
    response.status(200).json(results);
  });
};

// Route
app.route("/things/mostvoted").get(getMostVotedThings);


// Get thing by Id
const getThingById = (request, response) => {
  const id = request.params.id;
  dbQuery(
    "SELECT * from things where thing_id = ?",
    [id],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not retrieve thing" });
        }
        if (results.length === 0) { 
          return response.status(404).json({ error: "Thing not found" });
        }
        response
        .status(200)
        .json(results[0]);
    }
  );
}

// Route
app.route("/things/:id").get(getThingById);


// Get all things from a user by user_id

const getAllThingsFromUser = (request, response) => {
  const id = request.params.id;
  dbQuery(
    "SELECT * from things where user_id = ?",
    [id],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not retrieve thing" });
        }
        if (results.length === 0) { 
          return response.status(404).json({ error: "Thing not found" });
        }
        response
        .status(200)
        .json(results);
    }
  );
}

// Route
app.route("/things/user/:id").get(getAllThingsFromUser);


// Get all things
const getAllThings = (request, response) => {
  dbQuery("SELECT * FROM things", (error, results) => {
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
  const { user_id, user_name, thing_title, location, category} = request.body;
  saveImage(request.file);
  const imgName = request.file.originalname;
  dbQuery(
    "INSERT INTO things(user_id, user_name, img_name, thing_title, location, category) VALUES (?,?,?,?,?,?)",
    [user_id, user_name, imgName, thing_title, location, category],
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
  const newPath = (`./img_uploads/${file.originalname}`);
  fs.renameSync(file.path, newPath);
  return newPath; 
}

// Route
app.route("/things").post(upload.single("image"), postThing);

// Delete thing
// const delThing = (request, response) => {
//   const id = request.params.id;
//   dbQuery(
//     "Delete from things where id = ?",
//     [id],
//     (error, results) => {
//         if (error) {        
//             return response.status(500).json({ error: " Server Error. Could not delete thing" });
//         }
//         response
//         .status(201)
//         .json({ "Thing removed successfully": results.affectedRows });
//     }
//   );
// };

// Route
// app.route("/things/:id").delete(delThing);


// Update votes
const updateVotes = (request, response) => {
  const { thing_id, votevalue } = request.body;
  dbQuery(
    "UPDATE things SET votes = votes + ? WHERE thing_id = ?",
    [votevalue, thing_id],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not update votes" });
        }
        response
        .status(200)
        .json({ "Votes updated successfuly": results.affectedRows });

    }
  );
}

// Route
app.route("/things/updatevotes").post(updateVotes);





module.exports = app;
