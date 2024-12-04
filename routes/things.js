const express = require("express");
const multer = require("multer");
const fs = require("node:fs");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const { authenticateToken } = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// Database connection
const { dbQuery } = require("../config/config.db");

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_CREDENTIALS_JSON
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);



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
  const thing_id = request.params.id;
  dbQuery(
    "SELECT * from things where thing_id = ?",
    [thing_id],
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
  const thing_id = request.params.id;
  dbQuery(
    "SELECT * from things where user_id = ?",
    [thing_id],
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
app.route("/things/user/:id").get(authenticateToken, getAllThingsFromUser);


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
const postThing = async (request, response) => {
  const { user_id, user_name, thing_title, location, category} = request.body;

  if (!request.file){
    return response.status(400).json({ error: "No image uploaded"});
  }
  try{
    const imgName = await uploadFileToGCS(request.file.buffer, request.file.originalname);
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
  } catch (error){
    console.error('Error uploading file to GCS', error);
    response.status(500).json({ error: "Failed to upload image to Google Cloud Storage"});
  }
};

// Logic for file uploading to Google Cloud Storage
async function uploadFileToGCS(fileBuffer, destinationFilename) {
  const file = bucket.file(destinationFilename);

  try {
    await file.save(fileBuffer, {
        gzip: true, 
        metadata: {
            cacheControl: 'public, max-age=31536000', 
        },
    });

    return `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${destinationFilename}`;
  } catch (error) {
    console.error('Failed to upload to Google Cloud Storage:', error);
    throw error;  // Rethrow to handle it in the calling function
  }
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


// Update votes (returns votes updated thing)
const updateVotes = (request, response) => {
  const { thing_id, votevalue } = request.body;
  dbQuery(
    "UPDATE things SET votes = ? WHERE thing_id = ?",
    [votevalue, thing_id],
    (error, results) => {
        if (error) {        
            return response.status(500).json({ error: " Server Error. Could not update votes" });
        }
        dbQuery(
          "SELECT * from things where thing_id = ?",
          [thing_id],
          (error, results) => {
            if (error) {
              return response.status(500).json({ error: "Server Error. Could not retrieve vote updated thing" });
            }
            if (results.length > 0) {
              // Send back the updated thing
              response.status(200).json(results[0]);
            } else {
              response.status(404).json({ error: "No such thing found to update votes" });
            }

          }
        );
      }
  );
}

// Route
app.route("/things/updatevotes").post(updateVotes);





module.exports = app;
