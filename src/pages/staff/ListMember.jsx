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
      <div className="flex gap-4 w-full flex-wrap text-center px-16 bg-[#9a9a9a] min-h-screen">
        {memberList2.map((member) => (
          <div className="flex flex-col space-x-6 border border-white rounded-lg shadow-lg p-4 w-[35rem] my-8 bg-[#fff]">
            <div className="w-full transform overflow-hidden cursor-pointer">
              <img
                className="w-[300px] h-[200px] mx-auto object-contain rounded transform hover:scale-105 transition-all duration-300"
                src={"/default-avatar.png"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-lg tracking-widest my-4">
                {member.name}
              </h2>
              <p className="text-gray-500">
                Age: {member.age} - Gender: {member.gender}
              </p>
              <p className="text-gray-500">Job: {member.job}</p>
              <p className="text-gray-500">Occupation: {member.occupation}</p>
              <p className="text-gray-500">
                Birthday: {new Date(member.birthday).toLocaleDateString()}
              </p>
              <p className="text-gray-500">Type: {member.memberType}</p>
              <p className="text-gray-500">Email: {member.email}</p>
              <p className="text-gray-500">Email: {member.phoneNumber}</p>
              <div className="w-full text-center mt-4">
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
            </div>
          </div>
        ))}
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
