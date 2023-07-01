import React from "react";

function DeletePopup({
  setOpenDeletePopup,
  memberList,
  setMemberList,
  deletedMemberId,
}) {
  const handleDelete = () => {
    setOpenDeletePopup(false);
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700/[0.8]">
      <div className="flex gap-12 flex-col w-[30%] px-24 py-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-center rounded-xl">
        <h1 className="text-2xl font-black">
          Are you sure you want to delete this?
        </h1>
        <div>
          <button
            className="bg-green-500 font-black text-white p-4 w-24 mr-8 rounded-xl hover:bg-green-600 active:bg-green-700 transform active:scale-95"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-red-500 font-black text-white p-4 w-24 rounded-xl hover:bg-red-600 active:bg-red-700 transform active:scale-95"
            onClick={() => {
              setOpenDeletePopup(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;