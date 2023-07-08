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
  const staffManagement = ["member", "membership", "feedback"];
  const trainerManagement = ["member"];
  const memberManagement = ["feedback", "history", "info", "membership" , "registration"];
  const management = {
    adminManagement,
    staffManagement,
    trainerManagement,
    memberManagement,
  };

  return (
    <div className="flex flex-col h-full px-6">
      <div className="flex flex-col items-center justify-center mt-8 mb-12">
        <span className="block text-6xl text-white">
          <AiFillDashboard />
        </span>
        <h1 className="text-3xl font-extrabold tracking-wider text-center uppercase">
          <span className="text-primary">Gym</span> <br></br>
          <span className="text-secondary-200">Management</span>
        </h1>
      </div>
      <div className="flex flex-col space-y-3 text-lg font-semibold tracking-wider text-black">
        {role === "admin" && (
          <Link to="/admin" className="pb-3 border-b-2 border-gray-500">
            <span className="inline-flex mr-3 text-primary">
              <AiFillDashboard />
            </span>
            Dashboard
          </Link>
        )}
        {management[`${role}Management`]?.map((subject) => (
          <Link
            to={`/${role}/${subject}`}
            className="pb-3 border-b-2 border-gray-500"
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
          className="flex items-center px-4 py-2 mt-12 bg-gray-400 rounded-md shadow-lg"
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
