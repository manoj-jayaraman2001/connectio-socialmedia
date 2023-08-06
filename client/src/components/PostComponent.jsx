import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../State";
import Friend from "../components/Friend";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

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
      <p className="text-gray-700">{description}</p>
      {picturePath && (
        <img
          className="w-full h-auto rounded-md mt-3"
          alt="post"
          src={`http://localhost:3000/assets/${picturePath}`}
        />
      )}
      <div className="mt-1">
        <div gap="1rem">
          <div gap="0.3rem">
            <button
              className={`${
                isLiked ? "text-primary" : "text-gray-500"
              } hover:text-primary`}
              onClick={patchLike}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
            <span>{likeCount}</span>
          </div>

          <div gap="0.3rem">
            <button
              className="text-gray-500 hover:text-primary"
              onClick={() => setIsComments(!isComments)}
            >
              💬
            </button>
            <span>{comments.length}</span>
          </div>
        </div>

        <button className="text-gray-500 hover:text-primary">📤</button>
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

export default PostWidget;
