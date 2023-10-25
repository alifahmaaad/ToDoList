import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await axios.post("resetpassword", {
      username: data.get("username"),
      email: data.get("email"),
    });
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-fit max-h-[30rem] w-full max-w-[25rem] flex-col items-center justify-center rounded-md bg-gray-50 py-10 font-mono shadow-lg">
        <h1 className="text-xl font-bold">Reset Password</h1>
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
            required
          />
          <label htmlFor="email">E-mail</label>
          <input
            placeholder="email"
            name="email"
            id="email"
            className="w-full rounded-sm bg-white p-2"
            type="email"
            required
          />
          <button
            className="bg-gray-200 p-2 font-mono font-semibold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Send Reset Password to Email"}
          </button>
          <button
            className="bg-lime-100 p-2 font-mono font-semibold"
            type="button"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>
        </form>
        {/* {successMSG != "" && (
          <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-30">
            <div className="absolute rounded-md bg-white p-10 text-center font-bold text-green-700 shadow-md">
              <p>{successMSG}</p>
              <b className="text-black">Redirect to Home ...</b>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ForgetPassword;
