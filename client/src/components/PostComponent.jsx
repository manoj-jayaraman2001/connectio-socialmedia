import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../State";
import Friend from "../components/Friend";
import moment from "moment";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
const PostComponent = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const isDark = useSelector((state) => state.mode === "dark");
  const textColor = isDark ? 'text-gray-200' : 'text-gray-900'

  // ---------------format Time-------------------- //
  function formatDate(date) {
    const momentDate = moment(date);
    
    if (momentDate.isSame(moment(), "day")) {
      return "today";
    } else if (momentDate.isSame(moment().subtract(1, "days"), "day")) {
      return "yesterday";
    } else {
      const distance = momentDate.fromNow();
      return distance;
    }
  }

  const patchLike = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div
      className={`${
        isDark ? "bg-bgDarkWidget" : "bg-white"
      } rounded-lg p-4 shadow-md space-y-4 mb-2`}
    >
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {picturePath && (
        <img
          className={`w-full h-auto rounded-md mt-3`}
          alt="post"
          src={`${import.meta.env.VITE_BASE_URL}/assets/${picturePath}`}
        />
      )}
      <p className={textColor}>{description}</p>
      <p className={`${textColor} text-xs font-nunito`}>
        {formatDate(createdAt)}
      </p>
      <div className="flex place-content-between mt-1">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <button
              className={`${
                isLiked ? "text-primary" : textColor
              } hover:text-primary`}
              onClick={patchLike}
            >
              {isLiked ? (
                <HeartIcon className="text-primary h-5 w-5" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
            <span className={textColor}>{likeCount}</span>
          </div>

          <div className="flex gap-1">
            <button
              className={`${textColor} hover:text-primary`}
              onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            </button>
            <span className={textColor}>{comments.length}</span>
          </div>
        </div>

        <button className="text-primary">
          <ShareIcon className="h-5 w-5" />
        </button>
      </div>
      {isComments && (
        <div className="mt-2">
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              <hr className="border-t my-2" />
              <p className={`${textColor} m-2 pl-4`}>{comment}</p>
            </div>
          ))}
          <hr className="border-t" />
        </div>
      )}
    </div>
  );
};

export default PostComponent;
