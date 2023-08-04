const User = require("../models/User");

// sending friend request

const sendFriendRequest = async (req, res) => {
  try {
    const { userId, recipientId } = req.params;
    const recipient = await User.findById(recipientId);
    const sender = await User.findById(userId);
    recipient.friendRequests.push(userId);
    sender.sentRequests.push(recipientId);
    await Promise.all([recipient.save(), sender.save()]);
    return res.status(200).json({ message: "Freind Request Sent" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// display sent friend requests

const getSentFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "sentRequests",
      "name picturePath"
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

// display Received Friend Requests

const getReceivedFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friendRequests",
      "name picturePath"
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

// Undo Friend Request

const undoFriendRequest = async (req, res) => {
  try {
    const { userId, recipientId } = req.params;
    const recipient = await User.findById(recipientId);
    const sender = await User.findById(userId);

    // Remove the recipient from the sender's "sentRequests" array
    sender.sentRequests.pull(recipientId);
    await sender.save();

    return res.status(200).json({ message: "Friend request undone" });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  undoFriendRequest,
};
