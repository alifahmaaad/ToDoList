import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteIsLogin } from "../redux/TokenSlice";
import { useState } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await axios
      .get("logout", { withCredentials: true })
      .then((res) => {
        if (res.status == 200) {
          dispatch(deleteIsLogin());
          delete axios.defaults.headers.common["Authorization"];
          setTimeout(() => {
            navigate("/login");
            setIsLoading(false);
          }, 1500);
        }
      })
      .catch((e) => {
        if (e.response?.status == 403) {
          dispatch(deleteIsLogin());
          delete axios.defaults.headers.common["Authorization"];
          setTimeout(() => {
            navigate("/login");
            setIsLoading(false);
          }, 1500);
        }
        alert(e.message);
      });
  };
  return (
    <button
      className="bg-lime-100 p-2"
      onClick={() => handleLogout()}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
