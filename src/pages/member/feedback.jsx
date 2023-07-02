import React from "react";

import ProductItem from "./ProductItem";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";

import { Link, useLocation, useParams } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const MemberFeedback = (props) => {
  const [trainers, setTrainers] = useState([]);
  console.log(trainers);

  const userId = useSelector((state) => state.auth.id);

  const { pathname } = useLocation();
  const product = "your feedback";

  useEffect(() => {
    api
      .get("http://localhost:8080/api/feedback")
      .then(({ data }) =>
        setTrainers(data.filter((item) => item.memberId.memberId === userId))
      );
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between p-8 mx-4 my-8 bg-white shadow-2xl drop-shadow-md">
        <span className="mr-6 text-4xl text-primary">
          <AiOutlineUnorderedList />
        </span>
        <h2 className="text-4xl font-semibold tracking-widest uppercase">
          {product.slice(0, 1).toUpperCase() + product.slice(1)}
        </h2>
        <div></div>
        <Link
          to={`add`}
          className="w-16 h-16 p-1 text-xl font-bold text-center rounded-full rounded-xl"
        >
          <IoIosAddCircle className="w-full h-full text-5xl text-green-500 transition-all duration-200 hover:text-green-600 transfrom active:text-green-700 active:scale-95" />
        </Link>
      </div>
      {trainers.map((history) => (
        <div className="p-8 mx-4 space-y-12 bg-white shadow-lg">
          <div className="flex items-center p-4 space-x-6 border border-white rounded-lg shadow-lg">
            <div className="overflow-hidden cursor-pointer">
              <img
                className="w-[300px] h-[200px] object-contain rounded transform hover:scale-105 transition-all duration-300"
                src={
                  "https://levelfyc.com/wp-content/uploads/2021/09/lou-3803.jpg"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h2 className="my-4 text-lg font-semibold tracking-widest">
                {history.feedback_content}
              </h2>
              {/* <span className="block text-sm font-bold text-secondary-100">
                Training time: {history.trainingTime}
              </span>
              <span className="block text-sm font-bold text-secondary-100">
                Trainer:{" "}
                {
                  trainers.find((trainer) => (history.trainerId = trainer.id))
                    ?.name
                }
              </span> */}
              {/* <p className="mt-6 text-gray-500">Name...</p>
              <Link
                className="px-4 py-1 mt-auto ml-auto text-white transition-all duration-200 transform bg-orange-400 rounded-md shadow-md hover:bg-orange-500 active:scale-95"
                to={`/${role}/update${product}/id`}
              >
                <AiFillEdit />
              </Link>
              <Link
                className="px-4 py-1 mt-auto ml-auto text-white transition-all duration-200 transform bg-red-600 rounded-md shadow-md hover:bg-red-700 active:scale-95"
                to={`/admin/dashboard/updateproducts/1`}
              >
                <BsTrashFill />
              </Link> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberFeedback;
