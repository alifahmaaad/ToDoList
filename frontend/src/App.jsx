import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex h-full w-full items-center md:justify-between">
      <Routes>
        <Route path="*" element={<>404 page</>} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<>Register Page</>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<>Logout Page</>} />
      </Routes>
    </div>
  );
}

export default App;
