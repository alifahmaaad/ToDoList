import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UpdateList from "./UpdateList";
const TodolistCard = ({ handleDataTask, func }) => {
  return (
    <section className="min-h-10 flex w-full  items-center justify-between gap-2 border-b-2 border-t-2 p-2 px-8 ">
      <div className="flex flex-col flex-wrap gap-1">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="Todolist"
            className="checked:accent-lime-200"
          />
          <div>
            <h2 className="font-mono text-sm font-bold">Title</h2>
            <div className="line-clamp-2 font-mono text-sm">
              Ngapain ya hari ini Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Incidunt nemo magnam, ipsam tenetur id possimus
              delectus similique. Corrupti nulla consequuntur itaque, ullam
              officia unde magnam voluptas nostrum delectus optio pariatur!
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 pl-5">
          <Label />
          <Label />
          <Label />
          <Label />
          <div className="flex items-center gap-1 text-sm">
            <FontAwesomeIcon icon={faClock} />
            13.00
          </div>
          <div className="flex items-center gap-1 text-sm">
            <FontAwesomeIcon icon={faCalendar} />
            2023-06-033
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
            handleDataTask("data task");
          }}
        />
      </div>
    </section>
  );
};

export default TodolistCard;
