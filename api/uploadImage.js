// routes/upload.js
const express = require('express');
const router = express.Router();
//const cloudinary = require('../systemgitconfig/systemconfig');
const config = require('../systemgitconfig/systemconfig');
const cloudinary = config.cloudinary;

const uploads = require('../tools/fileUploads');
const apiErrors = require('../utils/apiErrors');
const apiResponse = require('../utils/apiResponse');
// Replace this with your DB logic
const saveImageToDB = (imageUrl) => {
  console.log("Saved to DB:", imageUrl);
};

const uploadImage = async function(req, res) {
  const file = req.file?.path;

  if (!file) {
    return apiResponse.sendError(apiErrors.APPLICATION.BAD_REQUEST, 'No file uploaded', 400, res);
  }

  try {
    console.log("---file----",file)
    const fileUploads = await cloudinary.uploader.upload(file, { resource_type: 'auto' });
    console.log("------fileUploads-------", fileUploads);

    const imageUrl = fileUploads.secure_url;
    saveImageToDB(imageUrl);

    return apiResponse.sendResponse({ imageUrl },200, res);
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    return apiResponse.sendError(apiErrors.APPLICATION.INTERNAL_ERROR, null, 500, res);
  }
};

  
  router.post('/image/uploadImage', uploads.single('file'), uploadImage);

module.exports = router;