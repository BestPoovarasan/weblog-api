const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/authen");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
dotenv.config();

// TEST HOMEPAGE------------------------>
app.get("/", (req, res) => {
  res.send("THIS IS API......!!!");
});

// MONGODB URL CONNECTION METHOD----------------->
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// MULTER LIBRARY IS USED FOR UPLOAD FILE METHOD--------->
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//<------- middleware------------>
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(
  cors({
    origin: "*",
  })
);
// routes------------------------>
app.use("/api/authen", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 3001);
