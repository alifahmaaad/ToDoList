import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
const TodolistCard = ({ handleDataTask, func, data, refresh }) => {
  const dateValue = new Date(data.datetime);
  const [isLoading, setIsLoading] = useState();
  const handleChecked = async (e) => {
    setIsLoading(true);
    await axios
      .put("task/update", {
        id: data._id,
        isChecked: e.target.checked,
      })
      .catch((e) => alert(e.message))
      .finally(() => {
        setIsLoading(false);
        refresh();
      });
  };
  useEffect(() => {}, [isLoading]);
  return (
    <section className="min-h-10 flex w-full  items-center justify-between gap-2 border-b-2 border-t-2 p-2 px-8 ">
      <div className="flex flex-col flex-wrap gap-1">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="Todolist"
            className="checked:accent-lime-200"
            defaultChecked={data.isChecked}
            onChange={(e) => handleChecked(e)}
            disabled={isLoading}
          />
          <div>
            <h2
              className={
                (data.isChecked ? "line-through " : "") +
                "font-mono text-sm font-bold"
              }
            >
              {data.task}
            </h2>
            <div
              className={
                (data.isChecked ? "line-through " : "") +
                "line-clamp-2 font-mono text-sm"
              }
            >
              {data.description}
            </div>
          </div>
        </div>
        <div
          className={
            (data.isChecked ? "line-through " : "") +
            "flex flex-wrap items-center gap-3 pl-5"
          }
        >
          {data.label?.map((val, i) => (
            <Label key={i} val={val} />
          ))}
          <div
            className={
              (data.isChecked ? "line-through " : "") +
              "flex items-center gap-1 text-sm"
            }
          >
            <FontAwesomeIcon icon={faClock} />
            {dateValue.toISOString().split("T")[1].replace(".000Z", "")}
          </div>
          <div
            className={
              (data.isChecked ? "line-through " : "") +
              "flex items-center gap-1 text-sm"
            }
          >
            <FontAwesomeIcon icon={faCalendar} />
            {dateValue.toDateString()}
          </div>
        </div>
      </div>
      <div>
        <button
          className={
            "h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-gray-500 duration-300"
          }
          onClick={() => {
            func();
            handleDataTask(data);
          }}
        />
      </div>
    </section>
  );
};

export default TodolistCard;
