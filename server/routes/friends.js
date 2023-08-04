const express = require("express");
const {
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  undoFriendRequest,
} = require("../controllers/friends");

const verifyToken = require("../middlewares/auth");



const router = express.Router()

// read (get req)
router.get('/:id/sent-requests', verifyToken, getSentFriendRequests)
router.get('/:id/received-requests', verifyToken, getReceivedFriendRequests)

// upate (patch req)
router.patch('/:id/:recipientId/send-request', verifyToken, sendFriendRequest)
router.patch('/:id/:recipientId/undo-request', verifyToken, undoFriendRequest)

module.exports = router