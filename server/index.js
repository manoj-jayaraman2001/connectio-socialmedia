const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const helmet = require("helmet");
// const {updateProfile} = require('./controllers/user.js')
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/posts.js")
const friendRoutes = require('./routes/friends.js')
const verifyToken = require("./middlewares/auth.js");
const { createPost } = require("./controllers/posts.js");
const {updateProfile} = require('./controllers/user.js')
// const User = require("./models/User.js");
// const Post = require("./models/Post.js")
// const { users, posts } = require("./data/index.js");

//configs:
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage config

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    console.log(file.originalname)
  },
});
const upload = multer({ storage });

/* routes with file uploads*/
app.patch("/users/:id/update-profile", upload.single("picture"), updateProfile)
app.post("/posts/create-post", verifyToken, upload.single("picture"), createPost);
// routes

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use('/posts', postRoutes);
app.use('/friends', friendRoutes)
// Mongoose setup

const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening in ${PORT}`);
    });
    // ADD DATA ONE TIME
    // User.insertMany(users);
    //  Post.insertMany(posts);
  })
  .catch((error) => {
    console.log(error);
  });
