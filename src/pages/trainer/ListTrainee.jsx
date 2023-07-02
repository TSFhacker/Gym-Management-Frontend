import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { BiLogOutCircle } from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth-actions";

const ListTrainee = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [updatedMemberId, setUpdatedMemberId] = useState(0);
  const [deletedMemberId, setDeletedMemberId] = useState(0);
  const [registrationList, setRegistrationList] = useState([]);
  const [memberList2, setMemberList2] = useState([]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const headerCells = [
    "ID",
    "Picture",
    "Name",
    "Date of birth",
    "Gender",
    "Email",
    "Phone Number",
    "Member type",
    "Action",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const logoutUser = async () => {
    await dispatch(logout(token));
    navigate("/");
  };

  const fetchData = async () => {
    let result = await fetch("http://localhost:8080/api/registrations");
    result = await result.json();
    console.log(result);
    setRegistrationList(
      result
        .filter((registration) => registration.memberId.memberId === userId)
        .map((e) => e.memberId)
    );
    console.log(registrationList);
  };

  return (
    <div className="w-full flex items-center">
      <div className="w-full bg-gray-100">
        <div className="flex items-center justify-between m-4 px-8 py-4 bg-white drop-shadow-lg">
          <span className="text-sm text-primary mr-6">
            <button
              className="px-4 py-2 bg-gray-400 rounded-md flex items-center shadow-lg"
              onClick={logoutUser}
            >
              <span className="inline-flex mr-3 font-bold">
                <BiLogOutCircle />
              </span>
              logout
            </button>
          </span>
          <h2 className="uppercase text-3xl tracking-widest font-semibold">
            Trainee List
          </h2>
          <div></div>
        </div>
        <div className="px-[16px] mt-[20px]">
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-teal-500">
                <tr className="header">
                  {headerCells.map((headerCell, index) => (
                    <th className="text-white text-left" key={index}>
                      <div className="px-[15px]">{headerCell}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrationList?.map((member) => (
                  <tr
                    key={member.memberId}
                    className="bg-[#fafafa] hover:bg-gray-100"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <td className="p-[15px]">{member.memberId}</td>
                    <td className="p-[15px]">
                      <img
                        src="/default-avatar.png"
                        alt="default"
                        className="w-[100px] h-auto rounded-md"
                      />
                    </td>
                    <td className="p-[15px] font-semibold">{member.name}</td>
                    <td className="p-[15px text-gray-500">{member.birthday}</td>
                    <td className="p-[15px] text-gray-500">{member.gender}</td>
                    <td className="p-[15px] text-gray-500">{member.email}</td>
                    <td className="p-[15px] text-gray-500">
                      {member.phoneNumber}
                    </td>
                    <td className="p-[15px] text-gray-500">
                      {member.memberType}
                    </td>
                    <td className="p-[15px]">
                      <div className="flex gap-2 items-center">
                        <div className="bg-blue-600  cursor-pointer p-[8px] inline-block rounded-sm">
                          <FiEdit
                            className="text-white cursor-pointer"
                            size={14}
                            onClick={setOpenModal}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTrainee;
