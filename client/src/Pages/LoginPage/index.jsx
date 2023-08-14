import logo from "../../assets/logo.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../State/index";
import { useDispatch, useSelector } from "react-redux";
import DisplayMessage from "../../components/DisplayMessage";
import { SpinLoader } from "../../components/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const isDark = useSelector((state) => state.mode === "dark");
  const textColor = isDark ? "text-gray-300" : "text-gray-800";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function login(email, password) {
    setloading(true);
    const savedUserResponse = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }), // Make sure to stringify the JSON data
    });
    const verifyUser = await savedUserResponse.json();
    if (!verifyUser.message) {
      dispatch(
        setLogin({
          user: verifyUser.user,
          token: verifyUser.token,
        })
      );
      navigate("/home");
    } else {
      setMessage(verifyUser.message);
      setloading(false);
    }
  }
  function handleLogin(event) {
    event.preventDefault();
    login(email, password);
  }

  return (
    <div
      className={`flex h-screen items-center justify-center ${
        isDark ? "bg-bgDark" : "bg-bgcolor"
      }`}
    >
      <div className="flex flex-col items-center gap-6 p-4 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Social-Pulse" className="w-36 h-36" />
          <p className="font-jsans text-xl font-semibold text-primary mb-2">
            Connectio
          </p>
          <p className={`${textColor} mb-6`}>Login to your Account</p>
          <form
            className="flex flex-col font-nunito gap-2"
            onSubmit={handleLogin}
          >
            <label className={`${textColor} text-sm`} htmlFor="email">
              Email
            </label>
            <input
              className={`${
                isDark ? "bg-gray-700" : ""
              } ${textColor} p-2 border border-gray-300 rounded outline-primary`}
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label className={`${textColor} text-sm`} htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                className={`${
                  isDark ? "bg-gray-700" : ""
                } ${textColor} p-2 border border-gray-300 outline-primary w-60 pr-10`}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              {password ? (
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 cursor-pointer text-primary hover:text-purple-600"
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </span>
              ) : (
                <></>
              )}
            </div>
            <Link className="font-semibold text-sm mt-2 text-primary hover:text-purple-600 mx-auto">
              Forgot Password?
            </Link>

            <button
              type="submit"
              className="bg-primary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded shadow w-40 mt-6 mx-auto"
            >
              Login
            </button>
          </form>
          {loading ? <SpinLoader /> : <></>}
          <p className={`${textColor} text-sm`}>
            New user? {" "}
            <Link
              to="/create-account"
              className="text-primary font-bold hover:text-purple-600"
            >
              create account
            </Link>
          </p>
          <p className="text-gray-400 text-sm mt-24 font-jsans">
            &copy; 2023 Connectio | Manoj Jayaraman
          </p>
        </div>
      </div>
      {showMessage && (
        <DisplayMessage message={showMessage} setMessage={setMessage} />
      )}
    </div>
  );
};

export default Login;
