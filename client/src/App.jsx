import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="create-account" element={<Signup />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
