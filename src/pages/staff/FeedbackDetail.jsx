import React from "react";

function FeedbackDetail({ memberName, content, setOpenModal }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700/[0.8]">
      <div className="flex gap-12 flex-col w-[30%] px-24 py-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-center rounded-xl">
        <button
          onClick={(e) => {
            setOpenModal(false);
          }}
          className="absolute top-8 right-8 text-3xl bg-transparent text-main font-black cursor-pointer border-none"
        >
          X
        </button>
        <img src="/default-avatar.png" className="w-1/2 mx-auto" />
        <h1 className="text-2xl font-black">{memberName}</h1>
        <div>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetail;
