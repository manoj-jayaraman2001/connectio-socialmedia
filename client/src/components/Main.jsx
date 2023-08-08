import CreatePost from "./CreatePostWidget";
import Posts from "../Pages/Posts";


const Main = () => {
    return (
      <div id="main" className="max-w-xl">
        <CreatePost />
        <div className="max-w-xl mt-3 ">
          <Posts />
        </div>
      </div>
    );
  };

export default Main;