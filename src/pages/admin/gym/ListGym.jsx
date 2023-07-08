import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import swal from "sweetalert";
import api from "../../../utils/api";
import { Pagination } from "antd";
import { debounce } from "lodash";
import SearchBox from "../../../components/admin/SearchBox";
import NotFound from "../../../components/admin/NotFound";

const ListGym = () => {
  const [gyms, setGyms] = useState([]);
  const [paginated, setPaginated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchGyms, setSearchGyms] = useState([]);

  const avatars = [
    "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=996&t=st=1688304411~exp=1688305011~hmac=fd4d016bad5a8370a7180abe5a07ac41536549a1eb63129bed58f99b7187623a",
    "https://img.freepik.com/premium-photo/natural-portrait-women-positive-thinking-idea_705804-2550.jpg",
    "https://img.freepik.com/free-photo/confident-bearded-man-with-dark-hair-has-serious-facial-expression-thinks-about-future-job-dressed-fashionable-shirt_273609-17204.jpg?size=626&ext=jpg&ga=GA1.1.52234686.1688304003&semt=ais",
    "https://img.freepik.com/free-photo/curly-ethnic-woman-shows-manicured-yellow-nails-has-glad-expression-smiles-happily-glad-after-visiting-manicurist-wears-casual-orange-jumper-isolated-purple-wall-keeps-hands-raised_273609-42663.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/image-smiling-young-office-lady-asian-business-entrepreneur-pointing-fingers-left-showing-client-info-chart-banner-aside-copy-space-white-background_1258-89369.jpg?size=626&ext=jpg&ga=GA1.1.52234686.1688304003&semt=ais",
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
  ];
  const handleChangePage = (page) => {
    setCurrentPage(page);
    setPaginated(gyms.slice((page - 1) * 7, page * 7));
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    const foundGyms = gyms.filter((gym) =>
      gym.yogaClass.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchGyms(foundGyms);
    if (foundGyms.length > 7) {
      setPaginated(foundGyms.slice(0, 10));
    } else {
      setPaginated(foundGyms);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchHandler = useCallback(debounce(searchHandler, 300), [
    gyms,
  ]);

  useEffect(() => {
    api
      .get("/api/v1/classManager")
      .then((res) => {
        if (res.status === 200) {
          setGyms(res.data);
          setSearchGyms(res.data);
          if (res.data.length > 7) {
            setPaginated(res.data.slice(0, 7));
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
    "Employee",
    "Maximum",
    "location",
    "Occupied",
    "Action",
  ];

  const handleDelete = (id, index) => {
    swal({
      title: "Are you sure?",
      text: "You can't undo this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(`/api/v1/yogaclass/delete?id=${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal("Poof! Gym has been deleted!", {
                icon: "success",
              });
              const newGyms = [...gyms];
              newGyms.splice((currentPage - 1) * 7 + index, 1);
              setGyms(newGyms);
              setSearchGyms(newGyms);
              if (newGyms.length > 7) {
                setPaginated(newGyms.slice((currentPage - 1) * 7, currentPage * 7));
              } else {
                setPaginated(newGyms);
              }
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
            Gym
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
                {paginated.length > 0 &&
                  paginated.map((gym, index) => (
                    <tr
                      key={gym.id}
                      className="cursor-pointer bg-[#fafafa] text-left hover:bg-gray-100"
                      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                    >
                      <td className="p-3">{gym.yogaClass.id}</td>
                      <td className="p-3">{gym.yogaClass.name}</td>
                      <td className="p-3 font-semibold">
                        <div className="flex items-center gap-1">
                          <img
                            className="object-cover object-center h-10 w-10 rounded-full"
                            src={index < 5 ? avatars[index] : avatars[5]}
                            alt=""
                          ></img>
                          {gym.gymStaff.name}
                        </div>
                      </td>
                      <td className="p-3 text-gray-500">
                        {gym.yogaClass.maximumNumber}
                      </td>
                      <td className="p-3 text-gray-500">
                        {gym.yogaClass.location}
                      </td>
                      <td className="p-3 text-gray-500">
                        {gym.yogaClass.occupied ? "Occupied" : "Not Occupied"}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2 items-center">
                          <div
                            className="bg-red-600  cursor-pointer p-[8px] inline-block rounded"
                            onClick={() =>
                              handleDelete(gym.yogaClass.id, index)
                            }
                          >
                            <FiTrash2
                              className="text-white cursor-pointer"
                              size={14}
                            />
                          </div>
                          <Link
                            to={`/admin/gym/${gym.id}/update`}
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
            {paginated.length === 0 && <NotFound />}
          </div>
          {searchGyms.length > 7 && (
            <div className="text-center w-full pt-4">
              <Pagination
                current={currentPage}
                total={Math.floor(gyms.length / 7 + 1) * 10}
                onChange={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListGym;
