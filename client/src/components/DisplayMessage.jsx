import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
const DisplayMessage = ({ message, setMessage }) => {
  const isDark = useSelector((state) => state.mode === "dark");
  const textColor = isDark ? 'text-gray-200' : 'text-gray-900'
  return (
    <div
      id="message"
      className={`fixed top-0 right-0 m-4 w-64 p-4 ${
        isDark ? "bg-gray-600" : "bg-white"
      } shadow-md rounded-md`}
    >
      <div className="flex justify-between items-center">
        <p className={textColor}>{message}</p>
        <button
          id="closeMessage"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => {
            setMessage(null);
          }}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="w-full h-1 mt-2 bg-gray-200 rounded"></div>
    </div>
  );
};

export default DisplayMessage;
