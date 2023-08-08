import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Messages from "./Pages/Messages";
import Main from "./components/Main";
import HelpComponent from "./Pages/Help.jsx";
import UpdateProfile from "./Pages/UpdateProfile";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="create-account" element={<Signup />} />
        <Route path="home" element={<Home />}>
          <Route path="feed" element={<Main />}/>
          <Route path="messages" element={<Messages/>}/>
          <Route path="help" element={<HelpComponent/>}/>
          <Route path="update-profile" element={<UpdateProfile/>}/>
        </Route>
          
      </Routes>
    </div>
  );
}

export default App;
