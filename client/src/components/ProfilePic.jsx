import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";
const ProfilePic = ({dimension, picturePath}) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {picturePath ? (
        <img
          src={`http://localhost:3000/assets/${picturePath}`}
          alt="img"
          className={`rounded-full ${dimension}`}
        />
      ) : (
        <UserCircleIcon className={`${dimension} text-gray-400`} />
      )}
    </div>
  );
};

export default ProfilePic;
