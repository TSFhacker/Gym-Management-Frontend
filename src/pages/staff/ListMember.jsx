import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";

import { Link } from "react-router-dom";
import MemberInfoForm from "./MemberInfoForm";
import DeletePopup from "./DeletePopup";

const ListMember = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [updatedMemberId, setUpdatedMemberId] = useState(0);
  const [deletedMemberId, setDeletedMemberId] = useState(0);
  const [memberList, setMemberList] = useState([]);
  const [memberList2, setMemberList2] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await fetch("http://localhost:8080/api/members");
    result = await result.json();
    console.log(result);
    setMemberList(result);
    setMemberList2(result);
  };

  const headerCells = [
    "ID",
    "Picture",
    "Name",
    "Date of birth",
    "Gender",
    "Email",
    "Phone Number",
    "Job",
    "Occupation",
    "Member type",
    "Action",
  ];

  const handleSearch = (e) => {
    setSearchInput(e.target.value);

    setMemberList2(
      memberList.filter((member) => {
        return (
          member.name.match(e.target.value) ||
          member.email.match(e.target.value) ||
          member.phoneNumber.match(e.target.value)
        );
      })
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <div className="text-primary mr-6">
          <input
            placeholder="Search name/email/phone number"
            onChange={handleSearch}
            className="border-solid border-2 border-slate-300 px-12 py-2 rounded-xl"
          />
        </div>
        <h2 className="uppercase text-4xl tracking-widest font-semibold transform -translate-x-full">
          Member
        </h2>

        <IoIosAddCircle
          onClick={(e) => {
            setOpenModal(true);
          }}
          className="h-16 w-16 text-5xl text-green-500 hover:text-green-600 transfrom transition-all duration-200 active:text-green-700 active:scale-95 cursor-pointer"
        />
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
              {memberList2?.map((member) => (
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
                  <td className="p-[15px text-gray-500">
                    {new Date(member.birthday).toLocaleDateString()}
                  </td>
                  <td className="p-[15px] text-gray-500">{member.gender}</td>
                  <td className="p-[15px] text-gray-500">{member.email}</td>
                  <td className="p-[15px] text-gray-500">
                    {member.phoneNumber}
                  </td>
                  <td className="p-[15px] text-gray-500">{member.job}</td>
                  <td className="p-[15px] text-gray-500">
                    {member.occupation}
                  </td>
                  <td className="p-[15px] text-gray-500">
                    {member.memberType}
                  </td>
                  <td className="p-[15px]">
                    <div className="flex gap-2 items-center">
                      <button
                        className="bg-orange-400 text-white px-4 py-1 rounded-md shadow-md hover:bg-orange-500 transition-all duration-200 transform active:scale-95 mr-8"
                        onClick={(e) => {
                          setOpenModal(true);
                          setUpdatedMemberId(member.memberId);
                          console.log(member.memberId);
                        }}
                      >
                        <AiFillEdit className="inline-block" />
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-700 transition-all duration-200 transform active:scale-95"
                        onClick={() => {
                          setOpenDeletePopup(true);
                          setDeletedMemberId(member.memberId);
                        }}
                      >
                        <BsTrashFill className="inline-block" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {openModal && updatedMemberId && (
        <MemberInfoForm
          setOpenModal={setOpenModal}
          setUpdatedMemberId={setUpdatedMemberId}
          member={memberList.find((e) => e.memberId === updatedMemberId)}
          setMemberList={setMemberList}
          memberList={memberList}
        />
      )}
      {openModal && !updatedMemberId && (
        <MemberInfoForm
          setOpenModal={setOpenModal}
          memberList={memberList}
          setMemberList={setMemberList}
        />
      )}

      {openDeletePopup && (
        <DeletePopup
          setOpenDeletePopup={setOpenDeletePopup}
          memberList={memberList}
          setMemberList={setMemberList}
          deletedMemberId={deletedMemberId}
        />
      )}
    </div>
  );
};

export default ListMember;
