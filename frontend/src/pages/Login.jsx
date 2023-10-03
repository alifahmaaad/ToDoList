import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/TokenSlice";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [successMSG, setSuccessMSG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setIsLoading(true);
    await axios
      .post(`http://localhost:5000/login`, {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        if (res.status == 200) {
          setSuccessMSG(`Login Success`);
          dispatch(setToken(res.data.token));
          setIsLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((e) => {
        if (e.code == "ERR_NETWORK") {
          alert(e.message);
        } else {
          alert(e.response.data.message);
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-fit max-h-[30rem] w-full max-w-[25rem] flex-col items-center justify-center rounded-md bg-gray-50 py-10 font-mono shadow-lg">
        <h1 className="text-xl font-bold">Login</h1>
        <form
          className="flex w-full flex-col gap-3 px-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username</label>
          <input
            placeholder="Username"
            name="username"
            className="w-full rounded-sm bg-white p-2"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            name="password"
            className="w-full rounded-sm bg-white p-2"
            type="password"
          />
          <button
            className="bg-gray-200 p-2 font-mono font-semibold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="py-5">
          No Account?{" "}
          <button
            type="button"
            className="text-lime-400"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
        {successMSG != "" && (
          <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-30">
            <p className="absolute rounded-md bg-white p-10 text-center font-bold text-green-700 shadow-md">
              {successMSG}
            </p>
            <p className="text-black">Redirect to Home ...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
