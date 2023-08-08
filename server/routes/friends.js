const express = require("express");
const addRemoveFriend = require("../controllers/friends");

const verifyToken = require("../middlewares/auth");

const router = express.Router();

// update (patch req)
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

module.exports = router;
