const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors("*"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./asset/img/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/upload", (req, res) => {
  return res.json({
    message: "success",
  });
});

app.post("/uploadImage", upload.single("file"), (req, res) => {
  if (!req?.file) {
    return res.json({
      message: "File Not Seleted!",
    });
  }

  return res.json({
    message: "success",
    file: req?.file,
  });
});

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
