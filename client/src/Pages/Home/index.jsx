import React from "react";
import UserWidget from "../../components/UserWidget";
import Navbar from "../Navbar";
import CreatePost from "../../components/CreatePostWidget";
import Posts from "../Posts";
import AdvertComponent from "../../components/AdvertComponent";
import './index.css'
const Home = () => {
  return (
    <div className="bg-bgcolor overflow-scroll scrollbar">
      <Navbar />
      <div className="flex flex-col md:flex-row md:justify-center md:items-start mt-1 md:gap-5 p-2">
        {/* Hide UserWidget on small screens */}
        <div className="hidden md:block max-w-sm">
          <UserWidget />
        </div>
        <div>
          <div className="max-w-xl">
            <CreatePost />
          </div>
          <div className="max-w-xl mt-3">
            <Posts />
          </div>
        </div>
        <div className="max-w-sm">
          <AdvertComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
