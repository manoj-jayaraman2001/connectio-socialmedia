const User = require("../models/User");

// can be used for displaying profile
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ message: err.message });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// can be used for showing friends list
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friendsData = Promise.all(user.friends.map((id) => User.findById));
    const minimizedFriends = friendsData.map((friendObj) => {
      return { _id, firstName, lastName, occupation, location, picturePath };
    });
    res.status(200).json(minimizedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports =  {getUser, getUserFriends}