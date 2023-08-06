import React, { useState } from "react";
import {
  PhotoIcon,
  FilmIcon,
  PaperClipIcon,
  MicrophoneIcon,
  EllipsisHorizontalCircleIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import ProfilePic from "./ProfilePic";

const CreatePost = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");

  const handlePost = async () => {
    // Your post handling logic here
  };

  return (
    <div className="p-4 border rounded bg-white">
      <div className="flex items-center space-x-4">
        {/* UserImage component */}
        <ProfilePic dimension={'h-10 w-10'}/>

        <input
          type="text"
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className="w-full bg-gray-100 rounded-full py-2 px-4 outline-primary"
        />
      </div>

      {/* Dropzone */}
      {isImage && (
        <div className="border rounded p-4 mt-4">
          {/* Dropzone component */}
          <div className="border-dashed border-primary-500 p-4 w-full cursor-pointer hover:bg-gray-200">
            {image ? (
              <div className="flex items-center justify-between">
                <p>{image.name}</p>
                <PencilIcon className="w-5 h-5" />
              </div>
            ) : (
              <p>Add Image Here</p>
            )}
          </div>
          {image && (
            <button
              onClick={() => setImage(null)}
              className="w-12 h-12 rounded-full bg-red-500 text-white"
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
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 ml-auto"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
