import { useEffect, useState } from "react";
import AddList from "../Component/AddList";
import FormList from "../Component/FormList";
import Sidebar from "../Component/Sidebar";
import TodolistCard from "../Component/TodolistCard";
import UpdateList from "../Component/UpdateList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dataTask, setDataTask] = useState();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.isLoginReducer);
  const handleIsOpenUpdate = () => {
    setIsAddOpen(false);
    setIsUpdateOpen(!isUpdateOpen);
  };
  const handleDataTask = (data) => {
    setDataTask(data);
  };
  const handleIsOpenAdd = () => {
    setIsUpdateOpen(false);
    setIsAddOpen(!isAddOpen);
  };
  useEffect(() => {
    (isUpdateOpen || isAddOpen) &&
      window.scrollTo(0, document.body.scrollHeight);
  }, [isAddOpen, isUpdateOpen]);
  useEffect(() => {
    !isLogin && navigate("/login");
  }, []);
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <Sidebar />
      <div className="flex h-full flex-col items-center gap-2 p-10">
        <h1 className="font-mono text-2xl font-bold">Today List</h1>
        <AddList func={handleIsOpenAdd} />
        <TodolistCard
          handleDataTask={handleDataTask}
          func={handleIsOpenUpdate}
        />
      </div>
      {isUpdateOpen && (
        <UpdateList func={handleIsOpenUpdate} dataTask={dataTask} />
      )}
      {isAddOpen && <FormList func={handleIsOpenAdd} />}
    </div>
  );
};

export default Home;
