import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiChevronDoubleLeft } from "react-icons/hi";
import api from "../../../utils/api";
import swal from "sweetalert";
import { FiTrash2 } from "react-icons/fi";
import { Modal } from "antd";

const GymUpdate = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [members, setMembers] = useState([]);
  const [gym, setGym] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [allFacility, setAllFacility] = useState([]);
  const [selectfacility, setSelectFacility] = useState({
    id: "",
    quantity: ""
  });

  const headerCells = [
    "Thumbnail",
    "Name",
    "Quantity",
    "Warranty Date",
    "Action",
  ];

  const handleChangeQuantity = (e, index) => {
    const newFacilities = [...facilities];
    newFacilities[index].quantity = e.target.value;
    newFacilities[index].changed = true;
    setFacilities(newFacilities);
  };

  const handleDeleteFacility = (index) => {
    swal({
      title: "Are you sure?",
      text: "You can't undo this action",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        api
          .delete(
            `/api/gymhasfacility/delete?gym=${id}&facility=${facilities[index].id}`
          )
          .then((res) => {
            if (res.status === 200) {
              swal("Poof! Facility has been deleted!", {
                icon: "success",
                timer: 1000,
              });
              const newFacilities = [...facilities];
              newFacilities.splice(index, 1);
              setFacilities(newFacilities);
            }
          })
          .catch((error) => {});
      }
    });
  };
  const handleChangeFacility = (e) => {
    setSelectFacility({...selectfacility, [e.target.name]: e.target.value})
  }

  const handleAddFacility = () => {
    const data = {
      gymClass: {
        id
      },
      facility: {
        id: selectfacility.id
      },
      quantity: selectfacility.quantity
    }
    api.post("/api/gymhasfacility/add",data)
      .then(res => {
        if(res.status === 200){
          setFacilities([...facilities, {
            ...res.data.facility,
            quantity: res.data.quantity,
            changed: false
          }])
        }
        setModalOpen(false)
      })
  };

  useEffect(() => {
    api.get("/api/v1/facility")
      .then((res) => {
        if (res.status === 200) {
          setAllFacility(res.data);
        }
      })
      .catch((error) => {});
  }, []);

  
  useEffect(() => {
    api.get("/api/v1/gymstaff")
      .then((res) => {
        if (res.status === 200) {
          setMembers(res.data);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    api
      .get(`/api/v1/classManager/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setGym(res.data[0]);
        }
      })
      .catch((error) => {});
    api.get(`/api/gymhasfacility/getclass?gym=${id}`).then((res) => {
      if (res.status === 200) {
        const newFormat = res.data.map((item) => ({
          ...item.facility,
          quantity: item.quantity,
          changed: false,
        }));
        setFacilities(newFormat);
      }
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      id: gym.yogaClass?.id,
      name: gym.yogaClass?.name,
      maximumNumber: gym.yogaClass?.maximumNumber,
      location: gym.yogaClass?.location,
      employee: gym.gymStaff?.id,
      occupied: gym.yogaClass?.occupied,
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      maximumNumber: Yup.number().required("Required"),
      occupied: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      employee: Yup.string().required("Required"),
    }),
    enableReinitialize: true,

    onSubmit: async (values) => {
      const data1 = {
        gymStaff: {
          id: values.employee,
        },
        yogaClass: {
          id,
        },
      };
      api
        .put(`/api/v1/classManager/update?id=${id}`, data1)
        .then((res) => {})
        .catch((error) => {});

      const data2 = { ...values };
      delete data2.employee;
      api
        .put(`/api/v1/yogaclass/update?id=${id}`, data2)
        .then((res) => {})
        .catch((error) => {});

      facilities.forEach((facility) => {
        if (facility.changed === true) {
          const data = {
            gymClass: {
              id,
            },
            facility: {
              id: facility.id,
            },
            quantity: Number(facility.quantity),
          };
          api
            .put(`/api/gymhasfacility/update`, data)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {});
        }
      });

      swal({
        title: "Success!",
        timer: 2000,
        text: "Facility updated successfully!",
        icon: "success",
        buttons: false,
      }).then(() => {
        navigate("/admin/gym");
      });
    },
  });

  return (
    <div className="w-full flex h-full">
      <div className="w-full bg-gray-100">
        <div className="px-[50px] mt-[20px]">
          <div>
            <div className="mx-4">
              <button
                className="px-4 text-lg uppercase tracking-widest bg-secondary-100rounded-lg drop-shadow-lg"
                onClick={() => navigate("/admin/gym")}
              >
                <span className="mr-2 inline-block">
                  {<HiChevronDoubleLeft />}
                </span>
                Back to gyms
              </button>
            </div>
            <div className="flex py-4 px-[200px] mt-2 bg-white shadow-lg">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 pb-4">
                    {/* type input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="id"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ID
                      </label>
                      <input
                        type="text"
                        name="id"
                        id="id"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.id}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.id && formik.errors.id && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.id}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.name}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="employee"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Employee
                      </label>
                      <select
                        id="employee"
                        name="employee"
                        onChange={formik.handleChange}
                        value={formik.values.employee}
                        onBlur={formik.handleBlur}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select employee</option>
                        {members.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.employee && formik.errors.employee && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.employee}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="maximumNumber"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Maximum Number
                      </label>
                      <input
                        type="number"
                        name="maximumNumber"
                        id="maximumNumber"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maximumNumber}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.maximumNumber &&
                        formik.errors.maximumNumber && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.maximumNumber}
                          </p>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="location"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.location && formik.errors.location && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.location}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="isOccupied"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Occupied
                      </label>
                      <select
                        id="occupied"
                        name="occupied  "
                        onChange={formik.handleChange}
                        value={formik.values.occupied}
                        onBlur={formik.handleBlur}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select occupied</option>
                        <option value={true}>Occupied</option>
                        <option value={false}>No Occupied</option>
                      </select>
                      {formik.touched.occupied && formik.errors.occupied && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.occupied}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                      Facilities
                    </label>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-500 dark:text-white cursor-pointer hover:text-gray-400"
                      onClick={() => setModalOpen(true)}
                    >
                      Add facility
                    </label>
                  </div>

                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-100">
                        {headerCells.map((headerCell, index) => (
                          <th
                            key={index}
                            className="text-sm font-medium text-gray-500 text-left"
                          >
                            <div className="p-2">{headerCell}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {facilities.map((falility, index) => (
                        <tr
                          key={index}
                          style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
                        >
                          <td className="p-2">
                            <img
                              src="https://blog.nasm.org/hubfs/cleangym%20%281%29.jpg"
                              alt="gym-img"
                              className="w-[50px] max-w-[50px] h-auto rounded-md"
                            />
                          </td>
                          <td className="font-medium p-2">
                            <div className="py-4">{falility.facilityName}</div>
                          </td>
                          <td className="p-2">
                            <input
                              required
                              type="text"
                              name="quantity"
                              value={facilities[index].quantity}
                              onChange={(e) => handleChangeQuantity(e, index)}
                              className="w-[50px] outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ></input>
                          </td>
                          <td className="p-2">
                            {falility.warrantyDate.slice(0, 10)}
                          </td>
                          <td className="text-center p-2">
                            <div
                              className="bg-red-600 text-center cursor-pointer p-[8px] inline-block rounded mt-4"
                              onClick={() => handleDeleteFacility(index)}
                            >
                              <FiTrash2
                                className="text-white cursor-pointer"
                                size={14}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center mt-5 gap-4 justify-end">
                    <Link to={`/admin/gym/${id}/detail`}>
                      <button
                        type="submit"
                        style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                        className="float-right bg-white text-slate-700 py-2 px-5 rounded-md hover:bg-slate-100"
                      >
                        Back to detail
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="float-right bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-500 mt-0"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={modalOpen}
        onOk={handleAddFacility}
        onCancel={() => setModalOpen(false)}
        okText={<span className="text-slate-500">Add</span>}
      >
        <h2 className="text-lg font-medium">Add facility</h2>
        <div className="flex flex-col space-y-1 my-3">
          <label
            htmlFor="facility"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Facility
          </label>
          <select
            required
            id="facility"
            name="id"
            value={selectfacility.id}
            onChange={(e) => handleChangeFacility(e)}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select facility</option>
            {allFacility.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.facilityName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            required
            type="number"
            name="quantity"
            id="quantity"
            value={selectfacility.quantity}
            onChange={(e) => handleChangeFacility(e)}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
      </Modal>
    </div>
  );
};

export default GymUpdate;
