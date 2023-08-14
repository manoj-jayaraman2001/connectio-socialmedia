import { useSelector } from "react-redux";
const AdvertComponent = () => {
  const isDark = useSelector((state) => state.mode === "dark");
  const textColor = isDark ? "text-gray-200" : "text-gray-900";
  return (
    <div
      className={`p-4 ${
        isDark ? "bg-bgDarkWidget" : "bg-white"
      } rounded-lg shadow-md`}
    >
      <div className={`${textColor} flex items-center justify-between mb-2`}>
        <h5 className="text-neutral-dark font-semibold">Sponsored</h5>
        <p className="text-neutral-medium">Create Ad</p>
      </div>
      <img
        className="w-full h-auto rounded-md my-3"
        alt="advert"
        src={`${import.meta.env.VITE_BASE_URL}/assets/info4.jpeg`}
      />
      <div className={`${textColor} flex items-center justify-between mb-2`}>
        <p className="text-neutral-main">MikaCosmetics</p>
        <p className="text-neutral-medium">mikacosmetics.com</p>
      </div>
      <p className={`text-gray-500 text-neutral-medium my-2`}>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </p>
    </div>
  );
};

export default AdvertComponent;
