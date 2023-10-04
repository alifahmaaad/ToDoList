import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Register = () => {
  const navigate = useNavigate();
  const [successMSG, setSuccessMSG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setIsLoading(true);
    await axios
      .post(`http://localhost:5000/register`, {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        if (res.status == 200) {
          setSuccessMSG(`username ${res.data} has been registered`);
          setIsLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((e) => {
        if (e.response?.data?.error) {
          alert(e.response.data.error);
        } else {
          alert(e.message);
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-fit max-h-[30rem] w-full max-w-[25rem] flex-col items-center justify-center rounded-md bg-gray-50 py-10 font-mono shadow-lg">
        <h1 className="text-xl font-bold">Register</h1>
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
            pattern="^[a-zA-Z]\S+$"
            title="Must start with character, no space and case sensitive"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            name="password"
            className="w-full rounded-sm bg-white p-2"
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
          <button
            className="bg-gray-200 p-2 font-mono font-semibold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="py-5">
          already have account?{" "}
          <button
            type="button"
            className="text-lime-400"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>

        {successMSG != "" && (
          <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-30">
            <div className="absolute rounded-md bg-white p-10 text-center font-bold text-green-700 shadow-md">
              <p>{successMSG}</p>
              <b className="text-black">Redirect to Login ...</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
