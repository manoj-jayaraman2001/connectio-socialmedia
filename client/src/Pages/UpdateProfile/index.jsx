import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector, useDispatch } from "react-redux";
import { setLogin } from "../../State";
import { SmallLoader } from "../../components/Loader";
import DisplayMessage from "../../components/DisplayMessage";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [formChanged, setFormChanged] = useState(false);
  const isDisabled = !formChanged || loading;
  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mode === "dark");
  const textColor = isDark ? "text-gray-200" : "text-gray-800";
  const id = userData._id;
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    location: userData.location,
    occupation: userData.occupation,
    picture: null,
    picturePath: userData.picturePath,
    relationshipStatus: userData.relationshipStatus,
  });

  const onDrop = (acceptedFiles) => {
    // Handle the uploaded profile picture here
    const file = acceptedFiles[0];
    // You can set the profilePic state to the file or its URL
    setFormData({ ...formData, picture: file, picturePath: file.name });
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg"] },
    onDrop,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormChanged(true);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can use the updated state values

    updateProfile(formData);
  };
  function handleMessage() {
    setShowMessage("Profile Updated");
    setTimeout(() => {
      setShowMessage(null);
    }, 2000);
  }
  async function updateProfile(formData) {
    setLoading(true);
    const updatedProfile = await fetch(
      `${import.meta.env.VITE_BASE_URL}/users/${id}/update-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const isUpdated = await updatedProfile.json();
    if (isUpdated) {
      dispatch(setLogin({ user: isUpdated, token: token }));
      setLoading(false);
      handleMessage();
      setFormChanged(false);
    }
  }

  return (
    <div
      className={`${
        isDark ? "bg-bgDarkWidget" : "bg-white"
      } rounded-md sm:w-full p-6 lg:w-1/3`}
    >
      <h2 className={`${textColor} text-2xl font-semibold mb-4`}>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className={`block font-medium mb-1 ${textColor}`}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`${isDark ? 'bg-gray-700' : ''} ${textColor} w-full border border-gray-300 rounded px-3 py-2 outline-primary`}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className={`block font-medium mb-1 ${textColor}`}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`${isDark ? 'bg-gray-700' : ''} ${textColor} w-full border border-gray-300 rounded px-3 py-2 outline-primary`}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePic" className={`block font-medium mb-1 ${textColor}`}>
            Profile Picture
          </label>
          <div
            {...getRootProps()}
            className="border border-gray-300 rounded p-2 cursor-pointer"
          >
            <input {...getInputProps()} />
            {formData.picture ? (
              <img
                src={URL.createObjectURL(formData.picture)}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full"
              />
            ) : (
              <p>Drag 'n' drop an image here, or click to select one</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className={`block font-medium mb-1 ${textColor}`}>
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className={`${isDark ? 'bg-gray-700' : ''} ${textColor} w-full border border-gray-300 rounded px-3 py-2 outline-primary`}
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="occupation" className={`block font-medium mb-1 ${textColor}`}>
            Occupation
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            className={`${isDark ? 'bg-gray-700' : ''} ${textColor} w-full border border-gray-300 rounded px-3 py-2 outline-primary`}
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="relationshipStatus"
            className={`block font-medium mb-1 ${textColor}`}
          >
            Relationship Status
          </label>
          <select
            id="relationshipStatus"
            name="relationshipStatus"
            className={`${isDark ? 'bg-gray-700' : ''} ${textColor} w-full border border-gray-300 rounded px-3 py-2 outline-primary`}
            value={formData.relationshipStatus}
            onChange={handleChange}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="complicated">Commited</option>
          </select>
        </div>
        <button
          type="submit"
          className={`${
            isDisabled ? "bg-gray-400" : "bg-primary"
          } text-white px-4 py-2 rounded-md ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isDisabled}
        >
          {loading ? <SmallLoader /> : "Update"}
        </button>
      </form>
      {showMessage && (
        <DisplayMessage message={showMessage} setMessage={setShowMessage} />
      )}
    </div>
  );
};

export default UpdateProfile;
