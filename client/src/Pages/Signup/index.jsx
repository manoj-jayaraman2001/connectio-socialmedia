import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisplayMessage from "../../components/DisplayMessage";
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setMessage] = useState(null)
  const isDark = useSelector(state => state.mode === 'dark')
  const textColor = isDark ? 'text-gray-300' : 'text-gray-800'
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  async function createUser(data) {
    const savedUserResponse = await fetch(
      "http://localhost:3000/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Make sure to stringify the JSON data
      }
    );
    const savedUser = await savedUserResponse.json();
    if (!savedUser.error) {
      navigate("/");
    }else{
      setMessage(savedUser.error)
    }
  }

  function handleSignup(event) {
    event.preventDefault();
    createUser(formData);
  }

  return (
    <div className={`flex h-screen items-center justify-center ${isDark ? 'bg-bgDark' : 'bg-bgcolor'}`}>
      <div className="flex flex-col items-center gap-6 p-2 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <img src={logo} alt="Social-Pulse" className="w-36 h-36" />
          <p className="font-jsans text-xl font-semibold text-primary mb-2">
            Connectio
          </p>
          <p className={`${textColor} mb-6`}>Create your Account</p>
          <form className="flex flex-col font-nunito gap-2" onSubmit={handleSignup}>
            <label className={`${textColor} text-sm`} htmlFor="firstName">
              First Name
            </label>
            <input
              className={`${isDark ? 'bg-gray-700' : ''} ${textColor} p-2 border border-gray-300 rounded outline-primary`}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter Your First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label className={`${textColor} text-sm`} htmlFor="lastName">
              Last Name
            </label>
            <input
              className={`${isDark ? 'bg-gray-700' : ''} ${textColor} p-2 border border-gray-300 rounded outline-primary`}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter Your Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label className={`${textColor} text-sm`} htmlFor="email">
              Email
            </label>
            <input
              className={`${isDark ? 'bg-gray-700' : ''} ${textColor} p-2 border border-gray-300 rounded outline-primary`}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className={`${textColor} text-sm`} htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                className={`${isDark && 'bg-gray-700'} ${textColor} p-2 border border-gray-300 outline-primary w-60 pr-10`}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
            </div>
            <button
              type="submit"
              // onClick={handleSignup}
              className="bg-primary hover:bg-purple-600 text-white font-bold py-2 px-4 rounded shadow w-40 mt-6 mx-auto"
            >
              Signup
            </button>
          </form>

          <p className={`${textColor} text-sm mt-4`}>
            Already have an account?{'   '}
            <Link
              to="/"
              className="text-primary font-bold hover:text-purple-600"
            >
              Login here
            </Link>
          </p>
          <p className="text-gray-400 text-sm mt-8 font-jsans">
            &copy; 2023 Connectio | Manoj Jayaraman
          </p>
        </div>
      </div>
      {showMessage && <DisplayMessage message={showMessage} setMessage={setMessage}/>}
    </div>
  );
};

export default Signup;
