import React, { useEffect } from "react";
import UserWidget from "../../components/UserWidget";
import Navbar from "../Navbar";
import AdvertComponent from "../../components/AdvertComponent";
import FriendListComponent from "../../components/FriendList";
import {  Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const userInfo = useSelector(state => state.user)
    const userId = userInfo._id
    const isDark = Boolean(useSelector(state => state.mode === 'dark'))
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home/feed");
  }, []);
  return (
    <div className={`${isDark ? 'bg-bgDark':'bg-bgcolor'}`}>
      <Navbar />
      <div className="flex flex-col min-h-screen max-h-full md:flex-row md:justify-center md:items-start mt-1 md:gap-5 p-2">
        <div className="hidden md:block max-w-sm">
          <UserWidget userInfo={userInfo} isProfile={false}/>
          <FriendListComponent userId = {userId} />
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
