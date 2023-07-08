import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiChevronDoubleLeft } from "react-icons/hi";
import api from "../../../utils/api";
import swal from "sweetalert";

const GymCreate = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/gymstaff")
      .then((res) => {
        if (res.status === 200) {
          setMembers(res.data);
        }
      })
      .catch((error) => {});
  }, []);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      maximumNumber: "",
      location: "",
      employee: {},
      isOccupied: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      maximumNumber: Yup.number().required("Required"),
      isOccupied: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      employee: Yup.string().required("Required"),
    }),
    enableReinitialize: true,

    onSubmit: async (values) => {
      const data = {...values};
      delete data.employee;
      api.post("/api/v1/yogaclass/add", data)
        .then((res) => {
          if (res.status === 200) {
            const data2 = {
              gymStaff: {
                id: values.employee,
              },
              yogaClass: {
                id: values.id,
              },
            };
            api.post("/api/v1/classManager/add", data2).then((res) => {
              if (res.status === 200) {
                swal({
                  title: "Success!",
                  timer: 2000,
                  text: "Gym created successfully!",
                  icon: "success",
                  buttons: false,
                }).then(() => {
                  navigate("/admin/gym");
                });
              }
            });
          }
        })
        .catch((error) => {});
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
                onClick={() => navigate(-1)}
              >
                <span className="mr-2 inline-block">
                  {<HiChevronDoubleLeft />}
                </span>
                Back to gyms
              </button>
            </div>
            <div className="flex py-8 px-[200px] mt-2 bg-white shadow-lg">
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
                        id="isOccupied"
                        name="isOccupied"
                        onChange={formik.handleChange}
                        value={formik.values.isOccupied}
                        onBlur={formik.handleBlur}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Select occupied</option>
                        <option value={true}>Occupied</option>
                        <option value={false}>No Occupied</option>
                      </select>
                      {formik.touched.isOccupied &&
                        formik.errors.isOccupied && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.isOccupied}
                          </p>
                        )}
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="float-right bg-blue-600 text-white py-2 px-5 rounded-md mt-5 hover:bg-blue-500"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymCreate;
