import { useEffect, useState } from "react";
import AddList from "../Component/AddList";
import FormList from "../Component/FormList";
import Sidebar from "../Component/Sidebar";
import TodolistCard from "../Component/TodolistCard";
import UpdateList from "../Component/UpdateList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const position = [
    "Today List",
    "Upcoming List",
    "List by date",
    "Checked List",
  ];
  const [sidebarVal, setSidebarVal] = useState(0);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dataTask, setDataTask] = useState();
  const [date, setDate] = useState(new Date());
  const [dataTasks, setDataTasks] = useState();
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.isLoginReducer);
  const handleIsOpenUpdate = (data) => {
    setIsAddOpen(false);
    setIsUpdateOpen(!isUpdateOpen);
    setDataTask(data);
  };
  const handleDataTask = (data) => {
    setDataTask(data);
  };
  const handleIsOpenAdd = () => {
    setIsUpdateOpen(false);
    setIsAddOpen(!isAddOpen);
  };
  const handleChangeSideBarVal = (val) => {
    setSidebarVal(val);
  };
  useEffect(() => {
    (isUpdateOpen || isAddOpen) &&
      window.scrollTo(0, document.body.scrollHeight);
  }, [isAddOpen, isUpdateOpen]);
  useEffect(() => {
    !isLogin && navigate("/login");
    setIsLoading(true);
    isLogin && getAllTodoList();
  }, [refresh]);
  const getAllTodoList = async () => {
    await axios
      .get("task")
      .then((res) => setDataTasks(res.data))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <Sidebar func={handleChangeSideBarVal} sidebarVal={sidebarVal} />
      <div className="flex h-full w-full flex-col items-center gap-2 p-10">
        <h1 className="font-mono text-2xl font-bold">{position[sidebarVal]}</h1>
        <AddList func={handleIsOpenAdd} />
        {position[sidebarVal] == "List by date" && (
          <input
            type="date"
            onChange={(e) => setDate(new Date(e.target.value))}
            className="w-full border p-2"
          />
        )}

        {isLoading ? (
          <div className="p-10">Loading...</div>
        ) : (
          dataTasks
            ?.filter((data) => {
              if (position[sidebarVal] == "Today List") {
                return (
                  new Date().getDate() == new Date(data.datetime).getDate()
                );
              } else if (position[sidebarVal] == "Upcoming List") {
                return new Date(data.datetime) > new Date();
              } else if (position[sidebarVal] == "List by date") {
                return date.getDate() == new Date(data.datetime).getDate();
              } else {
                return data.isChecked;
              }
            })
            .map((val, i) => (
              <TodolistCard
                handleDataTask={handleDataTask}
                func={handleIsOpenUpdate}
                key={i}
                data={val}
                refresh={() => setRefresh(!refresh)}
              />
            ))
        )}
      </div>
      {isUpdateOpen && (
        <UpdateList
          func={handleIsOpenUpdate}
          dataTask={dataTask}
          refresh={() => setRefresh(!refresh)}
        />
      )}
      {isAddOpen && (
        <FormList func={handleIsOpenAdd} refresh={() => setRefresh(!refresh)} />
      )}
    </div>
  );
};

export default Home;
