import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Messages from "./Pages/Messages";
import Main from "./components/Main";
import HelpComponent from "./Pages/Help";
import UpdateProfile from "./Pages/UpdateProfile";
import ProfilePage from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="create-account" element={<Signup />} />
        <Route path="home" element={isAuth ? <Home/> : <Navigate to="/" />}>
          <Route path="feed" element={<Main />} />
          <Route path="messages" element={<Messages />} />
          <Route path="help" element={<HelpComponent />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
