import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";
import "./interceptors/axios.js";
function App() {
  return (
    <div className="flex h-full w-full items-center md:justify-between">
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<>Logout Page</>} />
      </Routes>
    </div>
  );
}

export default App;
