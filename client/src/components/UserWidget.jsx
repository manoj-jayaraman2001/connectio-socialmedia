
import { useSelector } from "react-redux";
import {
  MapPinIcon,
  BriefcaseIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid"; // Import icons
import ProfilePic from "./ProfilePic";
const UserWidget = () => {
  const userInfo = useSelector((state) => state.user);
  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
  const profileImg = userInfo.picturePath
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-max">
      <div className="flex items-center gap-6">
        <div>
          <ProfilePic dimension={"h-16 w-16"} picturePath={profileImg} />
        </div>
        <div className="flex flex-col">
          <span className="text-base text-primary font-medium font-LatoFont">
            {fullName}
          </span>
          <span>Friends: {userInfo.friends.length}</span>
        </div>
        <div className="mb-2" title="update profile">
          <Cog8ToothIcon className="h-6 w6 text-primary cursor-pointer" />
        </div>
      </div>
      <div className="mt-4">
        <div>
          <div className="flex items-center gap-3 text-gray-500">
            <BriefcaseIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-jsans">
              {userInfo.occupation ? userInfo.occupation : "Not Disclosed"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-500">
            <MapPinIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-jsans">
              {userInfo.location ? userInfo.location : "Not Disclosed"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 pr-16">
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Relationship Status:</span>
          <span className="ml-auto font-jsans text-sm text-primary">{userInfo.relationStatus}</span>
        </div>
        <div className="flex items-center ">
          <span className="text-sm text-gray-500">Total Impressions:</span>
          <span className="ml-auto font-jsans text-sm text-primary">{userInfo.impressions}</span>
        </div>
        <div className="flex items-center ">
          <span className="text-sm text-gray-500">Profile Viewed:</span>
          <span className="ml-auto font-jsans text-sm text-primary">{userInfo.viewedProfile}</span>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
