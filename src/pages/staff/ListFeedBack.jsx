import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";

import { Link } from "react-router-dom";
import MemberInfoForm from "./MemberInfoForm";
import DeletePopup from "./DeletePopup";
import FeedbackDetail from "./FeedbackDetail";

const ListFeedback = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result = await fetch("http://localhost:8080/api/feedback");
    result = await result.json();
    console.log(result);
    setFeedbackList(result);
  };

  const headerCells = ["ID", "Name", "Type", "Content"];

  return (
    <div>
      <div className="text-center mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <h2 className="uppercase text-4xl tracking-widest font-semibold transform">
          Feedback
        </h2>
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
              {feedbackList?.map((feedback) => (
                <tr
                  key={feedback.id}
                  className="bg-[#fafafa] hover:bg-gray-100 cursor-pointer"
                  style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  onClick={() => {
                    setOpenModal(true);
                    setMemberName(feedback.memberId.name);
                    setContent(feedback.feedback_content);
                  }}
                >
                  <td className="p-[15px]">{feedback.feedbackId}</td>
                  <td className="p-[15px] font-semibold">
                    {feedback.memberId.name}
                  </td>
                  <td className="p-[15px] text-gray-500">
                    {feedback.feedback_type === 0 ? "Trainer" : "Gym"}
                  </td>
                  <td className="p-[15px] text-gray-500">
                    {feedback.feedback_content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <FeedbackDetail
          memberName={memberName}
          content={content}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
};

export default ListFeedback;
