import {
  faAnglesRight,
  faCalendarDays,
  faCircleCheck,
  faList12,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ func, sidebarVal }) => {
  const navigate = useNavigate();
  return (
    <aside className=" h-fit w-full rounded-md p-4 lg:h-full lg:w-fit">
      <div className="flex h-full flex-col gap-4 rounded-lg bg-gray-50 p-5 font-mono shadow-md lg:w-[18vw]">
        <p className="pb-5 text-2xl font-bold">Menu</p>
        <h5 className="text-sm font-semibold">Profile</h5>
        <button
          className={"flex items-center gap-2 rounded-sm border-b border-t p-2"}
          onClick={() => navigate("/profile/edit")}
        >
          <FontAwesomeIcon icon={faUser} />
          Edit Profile
        </button>
        <h5 className="text-sm font-semibold">Lists</h5>
        <div className="flex h-max flex-col justify-center gap-2">
          <button
            className={
              (sidebarVal == 1 ? "bg-gray-300 " : "") +
              "flex items-center gap-2 rounded-sm border-b border-t p-2"
            }
            onClick={() => func(1)}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
            Upcoming
          </button>
          <button
            className={
              (sidebarVal == 0 ? "bg-gray-300 " : "") +
              "flex items-center gap-2 rounded-sm border-b border-t p-2 "
            }
            onClick={() => func(0)}
          >
            <FontAwesomeIcon icon={faList12} />
            Today
          </button>
          <button
            className={
              (sidebarVal == 2 ? "bg-gray-300 " : "") +
              "flex items-center gap-2 rounded-sm border-b border-t p-2"
            }
            onClick={() => func(2)}
          >
            <FontAwesomeIcon icon={faCalendarDays} />
            Calendar
          </button>
          <button
            className={
              (sidebarVal == 3 ? "bg-gray-300 " : "") +
              "flex items-center gap-2 rounded-sm border-b border-t p-2"
            }
            onClick={() => func(3)}
          >
            <FontAwesomeIcon icon={faCircleCheck} />
            Checked List
          </button>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
