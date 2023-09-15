import Label from "./Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
const AddList = () => {
  return (
    <button className="min-h-10 flex h-fit w-full max-w-[45rem] items-center gap-2 border-2 p-2 px-8">
      <p className="-translate-y-0.5 text-xl">+</p>
      <p className="font-mono">Add List</p>
    </button>
  );
};

export default AddList;
