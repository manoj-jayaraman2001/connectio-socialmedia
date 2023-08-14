import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../State";
import Friend from "../components/Friend";
import moment from 'moment';
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
  // ---------------format Time-------------------- //
  function formatDate(date) {
    const momentDate = moment(date);
  
    if (momentDate.isSame(moment(), 'day')) {
      return 'today';
    } else if (momentDate.isSame(moment().subtract(1, 'days'), 'day')) {
      return 'yesterday';
    } else {
      const distance = momentDate.fromNow();
      return distance;
    }
  }
  

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3000/posts/${postId}/like`, {
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
    <div className="bg-white rounded-lg p-4 shadow-md space-y-4 mb-2">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />

      {picturePath && (
        <img
          className="w-full h-auto rounded-md mt-3"
          alt="post"
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500 text-xs font-nunito">{formatDate(createdAt)}</p>
      <div className="flex place-content-between mt-1">
        <div className="flex gap-4">
          <div className="flex gap-1">
            <button
              className={`${
                isLiked ? "text-primary" : "text-gray-500"
              } hover:text-primary`}
              onClick={patchLike}
            >
              {isLiked ? (
                <HeartIcon className="text-primary h-5 w-5" />
              ) : (
                <HeartIcon className="text-gray-400 h-5 w-5" />
              )}
            </button>
            <span>{likeCount}</span>
          </div>

          <div className="flex gap-1">
            <button
              className="text-gray-500 hover:text-primary"
              onClick={() => setIsComments(!isComments)}
            >
              <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            </button>
            <span>{comments.length}</span>
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
              <p className="text-gray-700 m-2 pl-4">{comment}</p>
            </div>
          ))}
          <hr className="border-t" />
        </div>
      )}
    </div>
  );
};

export default PostComponent;
