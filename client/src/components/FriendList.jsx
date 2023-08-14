import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Friend from "../components/Friend";
import { SpinLoader } from "./Loader";

const FriendListComponent = ({ userId }) => {
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [friendsData, setFriendsData] = useState(null);
  const isDark = Boolean(useSelector((state) => state.mode === "dark"));
  const textColor = isDark ? "text-gray-200" : "text-gray-900";
  const getFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/${userId}/friends`,
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

  if (!friendsData) {
    return (
      <div
        className={`p-4 h-max ${
          isDark ? "bg-bgDarkWidget" : "bg-white"
        } shadow-md rounded-lg mt-2`}
      >
        <h2 className={`text-xl font-semibold mb-6 font-LatoFont ${textColor}`}>
          Friends
        </h2>
        <div className="space-y-6">
          <SpinLoader />
        </div>
      </div>
    );
  }
  if (friendsData.message || friendsData.length === 0) {
    return (
      <div
        className={`p-4 h-max ${
          isDark ? "bg-bgDarkWidget" : "bg-white"
        } shadow-md rounded-lg mt-2`}
      >
        <h2 className={`text-xl font-semibold mb-6 font-LatoFont ${textColor}`}>
          Friends
        </h2>
        <div className={`${textColor} space-y-6`}>
          <p>No friends to show</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 h-max ${
        isDark ? "bg-bgDarkWidget" : "bg-white"
      } shadow-md rounded-lg mt-2`}
    >
      <h2 className={`text-xl font-semibold mb-6 font-LatoFont ${textColor}`}>
        Friends
      </h2>
      <div className="space-y-6">
        {friendsData.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendListComponent;
