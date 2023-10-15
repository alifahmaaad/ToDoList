import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../redux/TokenSlice";
import { useState } from "react";
import axios from "axios";
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
      .post(
        `login`,
        {
          username: data.get("username"),
          password: data.get("password"),
        },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status == 200) {
          setSuccessMSG(`Login Success`);
          dispatch(setIsLogin());
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
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
          alert(e.response?.data?.message);
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
            id="username"
            className="w-full rounded-sm bg-white p-2"
            type="text"
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            name="password"
            id="password"
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
            <div className="absolute rounded-md bg-white p-10 text-center font-bold text-green-700 shadow-md">
              <p>{successMSG}</p>
              <b className="text-black">Redirect to Home ...</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
