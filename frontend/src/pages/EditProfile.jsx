import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteIsLogin } from "../redux/TokenSlice";

const EditProfile = () => {
  const { isLogin } = useSelector((state) => state.isLoginReducer);
  const [dataUser, setDataUser] = useState();
  const [loading, setLoading] = useState(true);
  const [successMSG, setSuccessMSG] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    !isLogin && navigate("/login");
    isLogin && getUserData();
  }, []);
  const getUserData = async () => {
    await axios
      .get("/user")
      .then((res) => setDataUser(res.data))
      .finally(() => setLoading(false));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setLoading(true);
    await axios
      .put(`update/user`, {
        username: data.get("username"),
        old_password: data.get("old_password"),
        new_password: data.get("new_password"),
      })
      .then((res) => {
        if (res.status == 200) {
          setSuccessMSG(`username ${res.data} has been updated`);
          dispatch(deleteIsLogin());
          delete axios.defaults.headers.common["Authorization"];
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 1500);
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.code == "ERR_NETWORK") {
          alert(e.message);
        } else {
          alert(e.response?.data?.message);
        }
        setLoading(false);
      });
  };
  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Loading...
        {successMSG != "" && (
          <div className="absolute flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-30">
            <div className="absolute rounded-md bg-white p-10 text-center font-bold text-green-700 shadow-md">
              <p>{successMSG}</p>
              <b className="text-black">Redirect to Login ...</b>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-fit max-h-[30rem] w-full max-w-[25rem] flex-col items-center justify-center rounded-md bg-gray-50 py-10 font-mono shadow-lg">
        <h1 className="text-xl font-bold">Edit Profile</h1>
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
            pattern="^[a-zA-Z]\S+$"
            defaultValue={dataUser.username}
            title="Must start with character, no space and case sensitive"
            required
          />
          <label htmlFor="old_password">Enter Old Password</label>
          <input
            placeholder="Password"
            name="old_password"
            id="old_password"
            className="w-full rounded-sm bg-white p-2"
            type="password"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
          <label htmlFor="new_password">Enter New Password</label>
          <input
            placeholder="Password"
            name="new_password"
            id="new_password"
            className="w-full rounded-sm bg-white p-2"
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
          <button
            className="bg-gray-200 p-2 font-mono font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
          <button
            className="bg-lime-100 p-2 font-mono font-semibold"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
