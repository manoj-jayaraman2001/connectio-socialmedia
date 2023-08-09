import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../State";
import ProfilePic from "./ProfilePic";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { DotLoader } from "./Loader";
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.includes(friendId)
  const [isLoading, setLoading] = useState(false)
  const FriendIconComponent = () => {
    if(id === friendId) return <></>
    if (isLoading) return <DotLoader/>
    if (isFriend) {
      return <UserMinusIcon className="h-7 w-7 text-primary" />;
    }
    if (!isFriend) {
      return <UserPlusIcon className="h-7 w-7 text-primary" />;
    }
    
  };

  const patchFriend = async () => {
    setLoading(true)
    const response = await fetch(
      `http://localhost:3000/friends/${id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    setLoading(false)
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ProfilePic dimension={"h-10 w-10"} picturePath={userPicturePath} />
        <div
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          className="cursor-pointer"
        >
          <h5 className="text-neutral-main font-semibold hover:text-primary-light transition-colors">
            {name}
          </h5>
          <p className="text-neutral-medium text-sm">{subtitle}</p>
        </div>
      </div>
      <button onClick={patchFriend}>
        <FriendIconComponent />
      </button>
    </div>
  );
};

export default Friend;
