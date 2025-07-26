// middleware/multer.js
const multer = require('multer');
const path = require('path');
console.log("-----***------")
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1684923849.jpg
  }
});

const upload = multer({ storage: storage });

module.exports = upload;