import React from "react";

import ProductItem from "./ProductItem";
import { AiOutlineUnorderedList, AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";

import { Link, useLocation, useParams } from "react-router-dom";
import { HiChevronDoubleRight } from "react-icons/hi";

const TheProducts = (props) => {
  const products = useSelector((state) => state.products.products);

  const { pathname } = useLocation();
  const role = pathname.split("/")[1];
  const { product } = useParams();
  console.log(product);
  return (
    <div>
      <div className="flex items-center justify-between mx-4 my-8 p-8 bg-white shadow-2xl drop-shadow-md">
        <span className="text-4xl text-primary mr-6">
          <AiOutlineUnorderedList />
        </span>
        <h2 className="uppercase text-4xl tracking-widest font-semibold">
          {product.slice(0, 1).toUpperCase() + product.slice(1)}
        </h2>
        <Link
          to={`/${role}/add${product}`}
          className="rounded-xl h-16 w-16 text-xl font-bold p-1 text-center rounded-full"
        >
          <IoIosAddCircle className="w-full h-full text-5xl text-green-500 hover:text-green-600 transfrom transition-all duration-200 active:text-green-700 active:scale-95" />
        </Link>
      </div>
      <div className="bg-white mx-4 p-8 shadow-lg space-y-12">
        <div className="flex space-x-6 border border-white rounded-lg shadow-lg p-4">
          <div className="overflow-hidden cursor-pointer">
            <img
              className="w-[300px] h-[200px] object-contain rounded transform hover:scale-105 transition-all duration-300"
              src={
                "https://levelfyc.com/wp-content/uploads/2021/09/lou-3803.jpg"
              }
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg tracking-widest my-4">Name</h2>
            <span className="block text-secondary-100 font-bold text-sm">
              Price
            </span>
            <p className="text-gray-500 mt-6">Name...</p>
            <Link
              className="ml-auto mt-auto bg-orange-400 text-white px-4 py-1 rounded-md shadow-md hover:bg-orange-500 transition-all duration-200 transform active:scale-95"
              to={`/${role}/update${product}/id`}
            >
              <AiFillEdit />
            </Link>
            <Link
              className="ml-auto mt-auto bg-red-600 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-700 transition-all duration-200 transform active:scale-95"
              to={`/admin/dashboard/updateproducts/1`}
            >
              <BsTrashFill />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheProducts;
