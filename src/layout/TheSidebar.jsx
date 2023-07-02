import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdAddCircle, MdUpdate, MdViewList } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/auth-actions";
import { useNavigate } from "react-router-dom";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(logout(token));
    navigate("/");
  };

  const { pathname } = useLocation();
  const role = pathname.split("/")[1];

  const adminManagement = ["gym", "membership", "facility", "staff", "member"];
  const staffManagement = ["member"];
  const trainerManagement = ["member"];
  const memberManagement = ["feedback", "history", "info"];
  const management = {
    adminManagement,
    staffManagement,
    trainerManagement,
    memberManagement,
  };

  return (
    <div className="flex flex-col h-full px-6">
      <div className="mb-12 mt-8 flex flex-col justify-center items-center">
        <span className="block text-6xl text-white">
          <AiFillDashboard />
        </span>
        <h1 className="uppercase text-3xl tracking-wider font-extrabold text-center">
          <span className="text-primary">Gym</span> <br></br>
          <span className="text-secondary-200">Management</span>
        </h1>
      </div>
      <div className="flex flex-col text-black font-semibold tracking-wider text-lg space-y-3">
        {role === "admin" && (
          <Link to="/admin" className="border-b-2 pb-3 border-gray-500">
            <span className="inline-flex mr-3 text-primary">
              <AiFillDashboard />
            </span>
            Dashboard
          </Link>
        )}
        {management[`${role}Management`]?.map((subject) => (
          <Link
            to={`/${role}/${subject}`}
            className="border-b-2 pb-3 border-gray-500"
          >
            <span className="inline-flex mr-3 text-primary">
              <MdViewList />
            </span>
            {`${subject.slice(0, 1).toUpperCase() + subject.slice(1)}`}
          </Link>
        ))}
      </div>
      <div className="mt-auto mb-8">
        <button
          className="px-4 py-2 bg-gray-400 rounded-md flex items-center shadow-lg mt-12"
          onClick={logoutUser}
        >
          <span className="inline-flex mr-3 font-bold">
            <BiLogOutCircle />
          </span>
          logout
        </button>
      </div>
      {/* <ul>
                <li>
                    <Link to='/admin/dashboard/main'>Test</Link>
                </li>
            </ul> */}
    </div>
  );
};

export default TheSidebar;
