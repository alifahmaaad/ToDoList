import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const TodolistCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="min-h-10 flex w-full max-w-[20rem] items-center justify-between gap-2 border-b-2 border-t-2 p-2 px-8 md:max-w-[45rem]">
      <div className="flex flex-col flex-wrap gap-1">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="Todolist"
            className="checked:accent-lime-200"
          />
          <div>
            <h2 className="font-mono text-sm font-bold">Title</h2>
            <div
              className={(isOpen ? "" : "line-clamp-2 ") + "font-mono text-sm"}
            >
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
            (isOpen ? "-rotate-45 " : "rotate-45 ") +
            "h-1.5 w-1.5 border-r-2 border-t-2 border-gray-500 duration-300"
          }
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </section>
  );
};

export default TodolistCard;
