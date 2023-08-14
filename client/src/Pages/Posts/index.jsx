import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../State";
import PostComponent from "../../components/PostComponent";
import { SpinLoader } from "../../components/Loader";
const Posts = ({ userId, isProfile}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [Loading, setLoading] = useState(false)
  const isDark = useSelector(state => state.mode === 'dark')
  const getPosts = async () => {
    setLoading(true)
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false)
  };

  const getUserPosts = async () => {
    setLoading(true)
    const response = await fetch(
      `http://localhost:3000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false)
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(Loading) return(
    <div className="mt-20">
      <SpinLoader />
    </div>
  )

  if(posts.length === 0){
    return(
      <div className={`p-6 ${isDark ? 'bg-bgDarkWidget' : 'bg-white'} rounded-lg text-center h-screen`}>
        <p className="font-LatoFont text-gray-400">No Posts to show</p>
      </div>
    )
  }

  return (
    <div>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt
        }) => (
          <PostComponent
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt = {createdAt}
          />
        )
      )}
    </div>

  );
};

export default Posts;
