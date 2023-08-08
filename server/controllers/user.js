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

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, picturePath, ...updatedFields } = req.body;

    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields }, // Update only the provided fields
      { new: true }
    );
  
    if (updatedProfile) {
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { getUser, getUserFriends, updateProfile };
