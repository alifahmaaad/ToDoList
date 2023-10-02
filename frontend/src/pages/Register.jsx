import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
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
          >
            Register
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
      </div>
    </div>
  );
};

export default Register;
