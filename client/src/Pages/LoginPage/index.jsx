import logo from "../../assets/logo.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../State/index";
import { useDispatch } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function login(email, password) {
    const savedUserResponse = await fetch(
      "http://localhost:3000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password}), // Make sure to stringify the JSON data
      }
    );
    const verifyUser = await savedUserResponse.json();
    console.log(verifyUser);
    if (verifyUser) {
      dispatch(
        setLogin({
          user: verifyUser.user,
          token: verifyUser.token,
        })
      );
      navigate("/home");
    }
  }
  function handleLogin(event) {
    event.preventDefault();
    login(email, password)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-bgcolor">
      <div className="flex flex-col items-center gap-6 p-4 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Social-Pulse" className="w-36 h-36" />
          <p className="font-jsans text-xl font-semibold text-primary mb-2">
            Connectio
          </p>
          <p className="mb-6">Login to your Account</p>
          <form className="flex flex-col font-nunito gap-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="p-2 border border-gray-300 rounded outline-primary"
              type="text"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                className="p-2 border border-gray-300 outline-primary w-60 pr-10"
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
              onClick={handleLogin}
              className="bg-primary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded shadow w-40 mt-6 mx-auto"
            >
              Login
            </button>
          </form>

          <p className="text-sm">
            New user?
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
    </div>
  );
};

export default Login;
