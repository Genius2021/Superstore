const multer = require("multer");
const express = require("express");
const uploadRouter = express.Router();

const storage = multer.diskStorage({
    //    destination:(req, file, callback function to handle error)
    destination: (req, file, cb) => {
        cb(null, "images");

    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

uploadRouter.post("/", upload.single("file"), (req, res, next) => {
    res.status(200).json("File has been uploaded successfully!");
    next();
});



module.exports = uploadRouter;