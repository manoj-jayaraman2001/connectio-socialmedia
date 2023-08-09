import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../State";
import Friend from "../components/Friend";
import { SpinLoader } from "./Loader";

const FriendListComponent = () => {
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [friendsData, setFriendsData] = useState(null);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3000/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setFriendsData(data);
  };

  useEffect(() => {
    getFriends();
  }, [friends]);
  return (
    <div className="p-4 h-max bg-white shadow-md rounded-lg mt-2">
      <h2 className="text-xl font-semibold mb-6 font-LatoFont">Friends</h2>
      <div className="space-y-6">
        {friendsData ? (
          friendsData.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <SpinLoader />
        )}
        {friendsData && friendsData.length === 0 ? (
          <p className="text-gray-500 font-LatoFont">No Friends to show</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FriendListComponent;
