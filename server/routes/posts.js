const express = require("express");
const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/posts");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

// read (get req)
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// update (patch req)

router.patch("/:id/like", verifyToken, likePost);


module.exports = router