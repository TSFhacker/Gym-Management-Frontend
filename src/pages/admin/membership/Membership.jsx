import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import swal from "sweetalert";
import api from "../../../utils/api";
import { Pagination } from "antd";
import SearchBox from "../../../components/admin/SearchBox";
import { debounce } from "lodash";
import NotFound from "../../../components/admin/NotFound";

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname } = useLocation();
  const [searchMemberships, setSearchMemberships] = useState([]);

  const navigate = useNavigate();
  const role = pathname.split("/")[1];
  const handleChangePage = (page) => {
    setCurrentPage(page);
    setPaginated(memberships.slice((page - 1) * 10, page * 10));
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    const foundMemberships = memberships.filter((membership) =>
      membership.membershipName
        ?.toLowerCase()
        .includes(searchValue.toLowerCase())
    );
    setSearchMemberships(foundMemberships);
    if (foundMemberships.length > 10) {
      setPaginated(foundMemberships.slice(0, 10));
    } else {
      setPaginated(foundMemberships);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchHandler = useCallback(debounce(searchHandler, 300), [
    memberships,
  ]);

  useEffect(() => {
    api
      .get("/api/memberships")
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setMemberships(res.data);
          setSearchMemberships(res.data);
          if (res.data.length > 10) {
            setPaginated(res.data.slice(0, 10));
          } else {
            setPaginated(res.data);
          }
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

  const handleDelete = (e, id, index) => {
    e.stopPropagation();
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
              const newMemberships = [...memberships];
              newMemberships.splice((currentPage - 1) * 10 + index, 1);
              setMemberships(newMemberships);
              setSearchMemberships(newMemberships);
              if (newMemberships.length > 10) {
                setPaginated(
                  newMemberships.slice((currentPage - 1) * 10, currentPage * 10)
                );
              } else {
                setPaginated(newMemberships);
              }
            }
          })
          .catch((error) => {});
      }

      const deletedIndex = memberships.findIndex((e) => e.membershipId === id);
      setMemberships([
        ...memberships.slice(0, deletedIndex),
        ...memberships.slice(deletedIndex + 1),
      ]);
    });
  };
  return (
    <div className="w-full flex h-full">
      <div className="w-full bg-gray-100">
        <div className="flex items-center justify-between m-4 px-8 py-4 bg-white drop-shadow-lg">
          <h2 className="uppercase text-2xl tracking-widest font-semibold">
            Membership
          </h2>
          <div className="w-1/4">
            <SearchBox handleSearch={debounceSearchHandler} />
          </div>
          <Link to="create">
            {role === "admin" && (
              <IoIosAddCircle
                size={40}
                className="text-green-500 hover:text-green-600 transfrom transition-all duration-200 active:text-green-700 active:scale-19"
              />
            )}
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
                {paginated.length > 0 &&
                  paginated?.map((membership, index) => (
                    <tr
                      key={membership.membershipId}
                      className="cursor-pointer bg-[#fafafa] hover:bg-gray-100 text-center"
                      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                      onClick={() =>
                        navigate(`${membership.membershipId}/detail`)
                      }
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
                              onClick={(e) =>
                                handleDelete(e, membership.membershipId, index)
                              }
                            >
                              <FiTrash2
                                className="text-white cursor-pointer"
                                size={14}
                              />
                            </div>
                            <div
                              className="bg-blue-600  cursor-pointer p-[8px] inline-block rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  `/admin/membership/${membership.membershipId}/update`
                                );
                              }}
                            >
                              <FiEdit
                                className="text-white cursor-pointer"
                                size={14}
                              />
                            </div>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
            {paginated.length === 0 && <NotFound />}
          </div>
          <div className="text-center py-4">
            {searchMemberships.length > 10 && (
              <Pagination
                current={currentPage}
                total={Math.floor(paginated.length / 10 + 1) * 10}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
