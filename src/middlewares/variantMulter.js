// // src/middlewares/variantMulter.js
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Set up storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = path.join(__dirname, "../uploads/variants");

//     // ✅ Ensure the folder exists
//     fs.mkdirSync(dir, { recursive: true });

//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() + "-" + file.fieldname + path.extname(file.originalname)
//     );
//   },
// });

// // File filter (optional)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

// // Create upload instance
// const upload = multer({ storage, fileFilter });

// // 👉 Export the configured `upload`
// module.exports = upload;
