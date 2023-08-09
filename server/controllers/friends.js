const User = require("../models/User");

// sending friend request

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(id, friendId)
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      console.log('filtering')
      user.friends = user.friends.filter((id) => id != friendId);
      friend.friends = friend.friends.filter((id) => id != id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    

    res.status(200).json(user.friends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = addRemoveFriend