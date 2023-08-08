import React, { useEffect } from "react";
import UserWidget from "../../components/UserWidget";
import Navbar from "../Navbar";
import CreatePost from "../../components/CreatePostWidget";
import Posts from "../Posts";
import AdvertComponent from "../../components/AdvertComponent";
import "./index.css";
import FriendListComponent from "../../components/FriendList";
import { Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Messages from "../Messages";

const Home = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/home/feed')
    }, [])
  return (
    <div className="bg-bgcolor">
      <Navbar />
      <div className="flex flex-col md:flex-row md:justify-center md:items-start mt-1 md:gap-5 p-2">
        <div className="hidden md:block max-w-sm">
          <UserWidget />
          <FriendListComponent />
        </div>
        <Outlet />
        <div className="hidden xl:block max-w-sm">
          <AdvertComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
