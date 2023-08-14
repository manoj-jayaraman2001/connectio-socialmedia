import { useSelector } from "react-redux";
const Messages = () => {
  const isDark = useSelector((state) => state.mode === "dark");
  return (
    <div
      className={`${
        isDark ? "bg-bgDarkWidget" : "bg-white"
      } sm:w-full md:w-1/2 xl:w-1/3 flex  p-6 h-screen rounded-lg`}
    >
      <p className="text-gray-500 mx-auto">No Messages to show here</p>
    </div>
  );
};

export default Messages;
