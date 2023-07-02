import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiChevronDoubleLeft } from "react-icons/hi";
import api from "../../../utils/api";
import swal from "sweetalert";

const StaffCreate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      address: "",
      phoneNum: "",
      citizenIdentityID: "",
      startDate: "",
      role: "",
      finishContractDate: "",
      workingFaculty: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      dob: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      phoneNum: Yup.string().required("Required"),
      citizenIdentityID: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
      finishContractDate: Yup.string().required("Required"),
      workingFaculty: Yup.string().required("Required"),
    }),
    enableReinitialize: true,

    onSubmit: async (values) => {
      api.post(`/api/v1/gymstaff/add `, values).then((res) => {
        if (res.status === 200) {
          swal({
            title: "Success!",
            timer: 2000,
            text: "Staff added successfully!",
            icon: "success",
            buttons: false,
          }).then(() => {
            navigate("/admin/staff");
          });
        }
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
                onClick={() => navigate(-1)}
              >
                <span className="mr-2 inline-block">
                  {<HiChevronDoubleLeft />}
                </span>
                Back to facilities
              </button>
            </div>
            <div className="flex py-8 px-[100px] mt-2 bg-white shadow-lg">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex gap-4">
                    {/* File input */}
                    <div className="w-3/5 flex flex-col items-center space-x-6 mb-5">
                      <div className="shrink-0">
                        <img
                          className="h-24  object-cover rounded-md"
                          src="https://archive.org/download/no-photo-available/no-photo-available.png"
                          alt="thumbnail"
                        />
                      </div>
                      <input
                        type="file"
                        name="thumbnail"
                        className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                      ></input>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      {/* Name input */}
                      <div className="w-4/5 flex flex-col space-y-1 mb-3">
                        <label
                          htmlFor="name"
                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="name"
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
                      {/* address input */}
                      <div className="w-4/5 flex flex-col space-y-1">
                        <label
                          htmlFor="address"
                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {formik.touched.address && formik.errors.address && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.address}
                          </p>
                        )}
                      </div>
                      {/*  phone */}
                      <div className="w-4/5 flex flex-col space-y-1">
                        <label
                          htmlFor="phoneNum"
                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          name="phoneNum"
                          id="phoneNum"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.warrantyDate}
                          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {formik.touched.phoneNum && formik.errors.phoneNum && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.phoneNum}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {/* dob input */}
                        <div className="w-full flex flex-col space-y-1">
                          <label
                            htmlFor="dob"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Dob
                          </label>
                          <input
                            type="text"
                            name="dob"
                            id="dob"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dob}
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                          {formik.touched.dob && formik.errors.tdobype && (
                            <p className="text-xs font-semibold text-red-500">
                              {formik.errors.dob}
                            </p>
                          )}
                        </div>
                        {/* citizenIdentityID input */}
                        <div className="w-full flex flex-col space-y-1 mb-3">
                          <label
                            htmlFor="citizenIdentityID"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            CitizenIdentity ID
                          </label>
                          <input
                            type="text"
                            name="citizenIdentityID"
                            id="citizenIdentityID"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.citizenIdentityID}
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                          {formik.touched.citizenIdentityID &&
                            formik.errors.citizenIdentityID && (
                              <p className="text-xs font-semibold text-red-500">
                                {formik.errors.citizenIdentityID}
                              </p>
                            )}
                        </div>
                        {/*  startDate */}
                        <div className="w-full flex flex-col space-y-1 mb-3">
                          <label
                            htmlFor="startDate"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Start date
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startDate}
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                          {formik.touched.startDate &&
                            formik.errors.startDate && (
                              <p className="text-xs font-semibold text-red-500">
                                {formik.errors.startDate}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* finishContractDate input */}
                        <div className="w-full flex flex-col space-y-1 mb-8">
                          <label
                            htmlFor="finishContractDate"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Finish Contract Date
                          </label>
                          <input
                            type="date"
                            name="finishContractDate"
                            id="finishContractDate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.finishContractDate}
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                          {formik.touched.finishContractDate &&
                            formik.errors.finishContractDate && (
                              <p className="text-xs font-semibold text-red-500">
                                {formik.errors.finishContractDate}
                              </p>
                            )}
                        </div>
                        {/* workingFaculty */}
                        <div className="w-full flex flex-col space-y-1 mb-8">
                          <label
                            htmlFor="role"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Role
                          </label>
                          <input
                            type="text"
                            name="role"
                            id="role"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                          {formik.touched.role && formik.errors.role && (
                            <p className="text-xs font-semibold text-red-500">
                              {formik.errors.role}
                            </p>
                          )}
                        </div>
                        <div className="w-full flex flex-col space-y-1 mb-8">
                          <label
                            htmlFor="workingFaculty"
                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Working Faculty
                          </label>
                          <input
                            type="text"
                            name="workingFaculty"
                            id="workingFaculty"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workingFaculty}
                            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          ></input>
                          {formik.touched.workingFaculty &&
                            formik.errors.workingFaculty && (
                              <p className="text-xs font-semibold text-red-500">
                                {formik.errors.workingFaculty}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4"></div>
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

export default StaffCreate;
