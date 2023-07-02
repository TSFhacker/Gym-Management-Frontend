import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";

import { Link } from "react-router-dom";

const ListGym = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [updatedMemberId, setUpdatedMemberId] = useState(0);
  const [deletedMemberId, setDeletedMemberId] = useState(0);
  const [gymList, setGymList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await fetch("http://localhost:8080/api/v1/yogaclass");
    result = await result.json();
    console.log(result);
    setGymList(result);
  };

  const headerCells = [
    "ID",
    "Name",
    "Employee Name",
    "Capacity",
    "Location",
    "State",
    "Action",
  ];
  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <div className="text-primary mr-6"></div>
        <h2 className="uppercase text-4xl tracking-widest font-semibold transform -translate-x-full">
          Gym
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
              {gymList?.map((gym) => (
                <tr
                  key={gym.id}
                  className="bg-[#fafafa] hover:bg-gray-100"
                  style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                >
                  <td className="p-[15px]">{gym.id}</td>
                  <td className="p-[15px]">
                    <img
                      src="/default-avatar.png"
                      alt="default"
                      className="w-[100px] h-auto rounded-md"
                    />
                  </td>
                  <td className="p-[15px] font-semibold">{gym.name}</td>
                  <td className="p-[15px] text-gray-500">
                    {gym.employee.name}
                  </td>
                  <td className="p-[15px] text-gray-500">
                    {gym.maximumNumber}
                  </td>
                  <td className="p-[15px] text-gray-500">{gym.location}</td>
                  <td className="p-[15px] text-gray-500">
                    {gym.occupied ? "Occupied" : "Available"}
                  </td>
                  <td className="p-[15px]">
                    <div className="flex gap-2 items-center">
                      <button className="bg-orange-400 text-white px-4 py-1 rounded-md shadow-md hover:bg-orange-500 transition-all duration-200 transform active:scale-95 mr-8">
                        <AiFillEdit className="inline-block" />
                      </button>
                      <button className="bg-red-600 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-700 transition-all duration-200 transform active:scale-95">
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
    </div>
  );
};

export default ListGym;
