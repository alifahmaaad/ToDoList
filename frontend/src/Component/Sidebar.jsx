import {
  faAnglesRight,
  faCalendarDays,
  faList12,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutButton from "../pages/LogoutButton";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isLogin } = useSelector((state) => state.isLoginReducer);
  return (
    <aside className=" h-fit w-full rounded-md p-4 lg:h-full lg:w-fit">
      <div className="flex h-full flex-col gap-4 rounded-lg bg-gray-50 p-5 font-mono shadow-md lg:w-[18vw]">
        <p className="pb-5 text-2xl font-bold">Menu</p>
        <label htmlFor="task" className="text-sm font-semibold">
          Lists
        </label>
        <div className="flex h-max flex-col justify-center gap-2">
          <button className="flex items-center gap-2 rounded-sm border-b border-t p-2">
            <FontAwesomeIcon icon={faAnglesRight} />
            Upcoming
          </button>
          <button className="flex items-center gap-2 rounded-sm border-b border-t bg-gray-300 p-2">
            <FontAwesomeIcon icon={faList12} />
            Today
          </button>
          <button className="flex items-center gap-2 rounded-sm border-b border-t p-2">
            <FontAwesomeIcon icon={faCalendarDays} />
            Calendar
          </button>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
