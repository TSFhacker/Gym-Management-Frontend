import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import swal from "sweetalert";
import api from "../../../utils/api";

const ListGym = () => {
  const [gyms, setGyms] = useState([]);
  const avatars = [
    "https://img.freepik.com/free-photo/portrait-handsome-brunet-unshaven-adult-man-looks-with-calm-confident-expression-has-serious-look-wears-casual-jumper-poses-making-photo-against-white-background-being-hard-impress_273609-57668.jpg?w=996&t=st=1688304411~exp=1688305011~hmac=fd4d016bad5a8370a7180abe5a07ac41536549a1eb63129bed58f99b7187623a",
    "https://img.freepik.com/premium-photo/natural-portrait-women-positive-thinking-idea_705804-2550.jpg",
    "https://img.freepik.com/free-photo/confident-bearded-man-with-dark-hair-has-serious-facial-expression-thinks-about-future-job-dressed-fashionable-shirt_273609-17204.jpg?size=626&ext=jpg&ga=GA1.1.52234686.1688304003&semt=ais",
    "https://img.freepik.com/free-photo/curly-ethnic-woman-shows-manicured-yellow-nails-has-glad-expression-smiles-happily-glad-after-visiting-manicurist-wears-casual-orange-jumper-isolated-purple-wall-keeps-hands-raised_273609-42663.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/image-smiling-young-office-lady-asian-business-entrepreneur-pointing-fingers-left-showing-client-info-chart-banner-aside-copy-space-white-background_1258-89369.jpg?size=626&ext=jpg&ga=GA1.1.52234686.1688304003&semt=ais",
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
  ];
  useEffect(() => {
    api
      .get("/api/v1/yogaclass")
      .then((res) => {
        if (res.status === 200) {
          setGyms(res.data);
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

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You can't undo this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api.delete(`/api/v1/yogaclass/delete?id=${id}`)
          .then((res) => {
            if (res.status === 200) {
              swal("Poof! Gym has been deleted!", {
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
          <span className="text-4xl text-primary mr-6">
            <AiOutlineUnorderedList />
          </span>
          <h2 className="uppercase text-3xl tracking-widest font-semibold">
            Gym List
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
                    <th className="text-white text-left" key={index}>
                      <div className="px-[15px]">{headerCell}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gyms?.map((gym, index) => (
                  <tr
                    key={gym.id}
                    className="cursor-pointer bg-[#fafafa] text-left hover:bg-gray-100"
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                  >
                    <td className="p-[15px]">{gym.id}</td>
                    <td className="p-[15px]">{gym.name}</td>
                    <td className="p-[15px] font-semibold">
                      <div className="flex items-center gap-1">
                        <img
                          className="object-cover object-center h-10 w-10 rounded-full"
                          src={index < 5 ? avatars[index] : avatars[5]}
                          alt=""
                        ></img>
                        {gym.employee.name}
                      </div>
                    </td>
                    <td className="p-[15px] text-gray-500">
                      {gym.maximumNumber}
                    </td>
                    <td className="p-[15px] text-gray-500">{gym.location}</td>
                    <td className="p-[15px] text-gray-500">
                      {gym.occupied ? "Occupied" : "Not Occupied"}
                    </td>
                    <td className="p-[15px]">
                      <div className="flex gap-2 items-center">
                        <div
                          className="bg-red-600  cursor-pointer p-[8px] inline-block rounded"
                          onClick={() => handleDelete(gym.id)}
                        >
                          <FiTrash2
                            className="text-white cursor-pointer"
                            size={14}
                          />
                        </div>
                        <Link
                          to={`/admin/facility/${gym.id}/update`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListGym;
