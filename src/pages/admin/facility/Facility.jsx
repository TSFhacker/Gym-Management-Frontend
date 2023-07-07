import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import swal from "sweetalert";
import { Pagination } from "antd";
import SearchBox from "../../../components/admin/SearchBox";
import NotFound from "../../../components/admin/NotFound";

const Facility = () => {
  const [facilities, setFacilities] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFacilities, setSearchFacilities] = useState([]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setPaginated(facilities.slice((page - 1) * 10, page * 10));
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    const foundFacilities = facilities.filter((facility) =>
      facility.facilityName?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchFacilities(foundFacilities);
    if (foundFacilities.length > 10) {
      setPaginated(foundFacilities.slice(0, 10));
    } else {
      setPaginated(foundFacilities);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchHandler = useCallback(debounce(searchHandler, 300), [facilities]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/facility")
      .then((res) => {
        if (res.status === 200) {
          setFacilities(res.data);
          setSearchFacilities(res.data);
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
    "Thumbnail",
    "Name",
    "Type",
    "Quantity",
    "Purchase Date",
    "Warranty Date",
    "Origin",
    "Status",
    "Action",
  ];

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You can't undo this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8080/api/v1/facility/delete?id=${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal("Poof! Facility has been deleted!", {
                icon: "success",
              });
            }
          })
          .catch((error) => {});
      }
    });
  };
  return (
    <div className="w-full flex items-center">
      <div className="w-full bg-gray-100">
        <div className="flex items-center justify-between m-4 px-8 py-4 bg-white drop-shadow-lg">
          <h2 className="uppercase text-2xl tracking-widest font-semibold">
            Facility
          </h2>
          <div className="w-1/4">
            <SearchBox handleSearch={debounceSearchHandler} />
          </div>
          <Link to="create">
            <IoIosAddCircle
              size={40}
              className="text-green-500 hover:text-green-600 transfrom transition-all duration-200 active:text-green-1000 active:scale-19"
            />
          </Link>
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
                {paginated.length > 0 && paginated?.map((product) => (
                  <tr
                    key={product.id}
                    className="cursor-pointer bg-[#fafafa] hover:bg-gray-100"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">
                      <img
                        src="https://blog.nasm.org/hubfs/cleangym%20%281%29.jpg"
                        alt="gym-img"
                        className="w-[100px] max-w-[100px] h-auto rounded-md"
                      />
                    </td>
                    <td className="p-3 font-semibold">
                      {product.facilityName}
                    </td>
                    <td className="p-3 text-gray-500">{product.type}</td>
                    <td className="p-3 text-center text-gray-500">
                      {product.quantity}
                    </td>
                    <td className="p-3 text-gray-500">
                      {product.dateOfPurchase?.slice(0, 10)}
                    </td>
                    <td className="p-3 text-gray-500">
                      {product.warrantyDate?.slice(0, 10)}
                    </td>
                    <td className="p-3 text-gray-500">{product.origin}</td>
                    <td className="p-3">
                      <div className="bg-[#33a248] h-[24px] px-[20px] leading-5 text-center text-white rounded-full">
                        {product.status}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 items-center">
                        <div
                          className="bg-red-600  cursor-pointer p-[8px] inline-block rounded"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FiTrash2
                            className="text-white cursor-pointer"
                            size={14}
                          />
                        </div>
                        <Link
                          to={`/admin/facility/${product.id}/update`}
                          className="bg-blue-600  cursor-pointer p-[8px] inline-block rounded"
                        >
                          <FiEdit
                            className="text-white cursor-pointer"
                            size={14}
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginated.length === 0 && (<NotFound />)}
          </div>
          <div className="text-center py-4">
            {searchFacilities.length > 10 && (
              <Pagination
                current={currentPage}
                total={Math.floor(facilities.length / 10 + 1) * 10}
                onChange={handleChangePage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
