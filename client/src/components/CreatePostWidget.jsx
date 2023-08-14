import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  PhotoIcon,
  FilmIcon,
  PaperClipIcon,
  MicrophoneIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import ProfilePic from "./ProfilePic";
import { setPosts } from "../State";
const CreatePost = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const picPath = image ? image.name: ""
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mode === "dark");
  const textColor = isDark ? 'text-gray-200' : 'text-gray-900'
  const profileImg = useSelector(state => state.user.picturePath)
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", post);
    formData.append("picture", image);
    formData.append("picturePath", picPath);

    const postCreated = await fetch("http://localhost:3000/posts/create-post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const posts = await postCreated.json();
    if (posts) {
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } else {
      console.log("error");
    }
  };

  const onDrop = (acceptedFiles) => {
    const uploadedImage = acceptedFiles[0];
    setImage(uploadedImage);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    "image/png": [".png", ".jpg",".avif"],
    onDrop,
  });

  return (
    <div className={`p-4  rounded ${isDark ? 'bg-bgDarkWidget' : 'bg-white'}`}>
      <div className="flex items-center space-x-4">
        {/* UserImage component */}
        <ProfilePic dimension={"h-10 w-10"} picturePath={profileImg} />

        <input
          type="text"
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${textColor} rounded-full py-2 px-4 outline-primary`}
        />
      </div>

      {/* Dropzone */}
      {isImage && (
        <div className="border rounded p-4 mt-4">
          <div
            {...getRootProps()}
            className="border-dashed border-primary-500 p-4 w-full cursor-pointer hover:bg-gray-200"
          >
            {image ? (
              <div className="flex items-center justify-between">
                <p>{image.name}</p>
                <PencilIcon className="w-5 h-5" />
              </div>
            ) : (
              <p>Add Image Here</p>
            )}
            <input {...getInputProps()} />
          </div>
          {image && (
            <button
              onClick={() => setImage(null)}
              className="w-12 h-12 rounded-full  text-red"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      <hr className="my-5" />

      <div className="flex gap-4 items-center flex-wrap">
        <div
          className={`flex items-center cursor-pointer gap-1 ${
            window.innerWidth <= 640 ? "hidden" : ""
          }`}
          onClick={() => setIsImage((value) => !value)}
        >
          <PhotoIcon className="w-5 h-5 text-primary gap-0" />
          <p className="text-gray-400 text-sm hidden md:block">Image</p>
        </div>
        <div className="flex items-center cursor-pointer gap-0">
          <FilmIcon className="w-5 h-5 text-primary" />
          <p className="text-gray-400 text-sm hidden md:block">Clip</p>
        </div>
        <div className="flex items-center cursor-pointer gap-0">
          <PaperClipIcon className="w-5 h-5 text-primary" />
          <p className="text-gray-400 text-sm hidden md:block">Attachment</p>
        </div>
        <div className="flex items-center cursor-pointer gap-0">
          <MicrophoneIcon className="w-5 h-5 text-primary" />
          <p className="text-gray-400 text-sm hidden md:block">Audio</p>
        </div>
        <button
          disabled={!post}
          onClick={handlePost}
          className="px-4 py-2 bg-primary text-white rounded-full disabled:bg-gray-300 ml-auto"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
