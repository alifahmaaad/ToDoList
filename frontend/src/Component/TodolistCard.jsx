import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
const TodolistCard = () => {
  return (
    <section className="min-h-10 flex w-full max-w-[45rem] items-center justify-between gap-2 border-b-2 border-t-2 p-2 px-8">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="Todolist"
            className="checked:accent-lime-200"
          />
          <div className="line-clamp-2 font-mono text-sm">
            Ngapain ya hari ini Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Incidunt nemo magnam, ipsam tenetur id possimus
            delectus similique. Corrupti nulla consequuntur itaque, ullam
            officia unde magnam voluptas nostrum delectus optio pariatur!
          </div>
        </div>
        <div className="flex items-center gap-3 pl-5 ">
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
        <div className="h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-gray-500" />
      </div>
    </section>
  );
};

export default TodolistCard;
