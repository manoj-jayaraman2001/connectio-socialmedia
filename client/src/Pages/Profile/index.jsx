import { useParams } from "react-router-dom";
import Posts from "../Posts";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import UserWidget from "../../components/UserWidget";
import FriendListComponent from "../../components/FriendList";
import AdvertComponent from "../../components/AdvertComponent";
import { SpinLoader } from "../../components/Loader";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  if (!user)
    return (
      <div className="h-screen flex items-center justify-center">
        <SpinLoader />
      </div>
    );
  return (
    <div className="bg-bgcolor h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row md:justify-center md:items-start mt-1 md:gap-5 p-2">
        <div className="hidden md:block max-w-sm">
          <UserWidget userInfo={user} isProfile />
          <FriendListComponent userId={userId} />
        </div>
        <div className="sm:w-full md:w-1/2 xl:w-1/3">
          <Posts userId={userId} isProfile={true} />
        </div>
        <div className="hidden xl:block max-w-sm">
          <AdvertComponent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
