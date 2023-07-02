import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import swal from "sweetalert";
import api from "../../../utils/api";

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const { pathname } = useLocation();
  const role = pathname.split("/")[1];

  useEffect(() => {
    api
      .get("/api/memberships")
      .then((res) => {
        if (res.status === 200) {
          setMemberships(res.data);
        }
      })
      .catch((error) => {});
  }, []);

  const headerCells = [
    "ID",
    "Name",
    "Training Time",
    "Price",
    "Price per Month",
    "Price per Day",
    "Class",
    "Action",
  ];

  role === "staff" && headerCells.pop();

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You can't undo this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`/api/memberships/${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal("Poof! Membership has been deleted!", {
                icon: "success",
                timer: 1000,
              });
            }
          })
          .catch((error) => {});
      }
    });
  };
  return (
    <div className="w-full flex h-full">
      <div className="w-full bg-gray-100">
        <div className="flex items-center justify-between m-4 px-8 py-4 bg-white drop-shadow-lg">
          <span className="text-4xl text-primary mr-6">
            <AiOutlineUnorderedList />
          </span>
          <h2 className="uppercase text-3xl tracking-widest font-semibold">
            Membership List
          </h2>
          <Link to="create">
            <IoIosAddCircle
              size={40}
              className="text-green-500 hover:text-green-600 transfrom transition-all duration-200 active:text-green-700 active:scale-19"
            />
          </Link>
        </div>
        <div className="px-[16px] mt-[20px]">
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-teal-500">
                <tr className="header">
                  {headerCells.map((headerCell, index) => (
                    <th className="text-white text-center" key={index}>
                      <div className="px-[15px]">{headerCell}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {memberships?.map((membership) => (
                  <tr
                    key={membership.membershipId}
                    className="cursor-pointer bg-[#fafafa] hover:bg-gray-100 text-center"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <td className="p-[15px]">{membership.membershipId}</td>
                    <td className="p-[15px] font-semibold">
                      {membership.membershipName}
                    </td>
                    <td className="p-[15px] text-center text-gray-800">
                      {membership.trainingTime}
                    </td>
                    <td className="p-[15px] text-gray-800">
                      {membership.price}$
                    </td>
                    <td className="p-[15px] text-gray-800">
                      {membership.pricePerMonth}$
                    </td>
                    <td className="p-[15px] text-gray-800">
                      {membership.pricePerDay}$
                    </td>
                    <td className="p-[15px] text-gray-800">
                      {membership.trainingClass}
                    </td>
                    {role === "admin" && (
                      <td className="p-[15px]">
                        <div className="flex gap-2 items-center justify-center">
                          <div
                            className="bg-red-600  cursor-pointer p-[8px] inline-block rounded"
                            onClick={() =>
                              handleDelete(membership.membershipId)
                            }
                          >
                            <FiTrash2
                              className="text-white cursor-pointer"
                              size={14}
                            />
                          </div>
                          <Link
                            to={`/admin/membership/${membership.membershipId}/detail`}
                            className="bg-green-600  cursor-pointer p-[8px] inline-block rounded"
                          >
                            <FiEye
                              className="text-white cursor-pointer"
                              size={14}
                            />
                          </Link>
                        </div>
                      </td>
                    )}
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

export default Membership;
