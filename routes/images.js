const express = require("express");
const multer = require("multer");
const fs = require("node:fs");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

// Database connection
const { dbQuery } = require("../config/config.db");

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: process.env.GOOGLE_CLOUD_CREDENTIALS_JSON
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);


// Post a thing
const postThing = async (request, response) => {
  const { user_id, user_name, thing_title, location, category} = request.body;

  if (!request.file){
    return response.status(400).json({ error: "No image uploaded"});
  }
  try{
    const imgName = await uploadFileToGCS(request.file.buffer, request.file.originalname);
    console.log("imgName: ", imgName);
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
    console.log('Uploaded file:', destinationFilename);

    return `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${destinationFilename}`;
  } catch (error) {
    console.error('Failed to upload to Google Cloud Storage:', error);
    throw error;  // Rethrow to handle it in the calling function
  }
}


// Route
app.route("/images").post(upload.single("image"), postThing);






module.exports = app;
