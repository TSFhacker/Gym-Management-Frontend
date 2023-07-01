import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { HiChevronDoubleLeft } from "react-icons/hi";
import TheSidebar from "../../layout/TheSidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

const FacilityUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/facility/1")
      .then(res => {
        setFacility(res.data[0])
      })
      .catch(error => {})
  }, []);

  const formik = useFormik({
    initialValues: {
      facilityName: facility.facilityName,
      type: facility.description,
      dateOfPurchase: facility.price,
      warrantyDate: facility.category,
      origin: facility.brand,
      status: facility.shipping,
    },
    validationSchema: Yup.object({
      facilityName: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      dateOfPurchase: Yup.number().required("Required"),
      warrantyDate: Yup.string().required("Required"),
      origin: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
    }),
    enableReinitialize: true,

    onSubmit: async (values) => {
      
    },
  });

  return (
    <div className="w-full flex">
      <div className="w-[300px] h-screen top-0 left-0 sticky bg-gradient-to-tr from-green-200 to-primary">
        <TheSidebar />
      </div>
      <div className="w-full bg-gray-100">
        <DashboardNavbar />
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
            <div className="flex py-8 px-[200px] mt-2 bg-white shadow-lg">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  {/* File input */}
                  <div className="flex items-center space-x-6 mb-5">
                    <div className="shrink-0">
                      <img
                        className="h-24  object-cover rounded-md"
                        src="https://blog.nasm.org/hubfs/cleangym%20%281%29.jpg"
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

                  {/* Name input */}
                  <div className="flex flex-col space-y-1 mb-3">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Facility name
                    </label>
                    <input
                      type="text"
                      name="facilityName"
                      id="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.facilityName}
                      className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></input>
                    {formik.touched.facilityName && formik.errors.facilityName && (
                      <p className="text-xs font-semibold text-red-500">
                        {formik.errors.facilityName}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {/* type input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        id="type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.type}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.type && formik.errors.type && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.type}
                        </p>
                      )}
                    </div>

                    {/* date input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="purchase"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Purchase date
                      </label>
                      <input
                        type="date"
                        name="dateOfPurchase"
                        id="purchase"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formik.touched.dateOfPurchase &&
                        formik.errors.dateOfPurchase && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.dateOfPurchase}
                          </p>
                        )}
                    </div>

                    {/* date input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="warranty"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Warranty date
                      </label>
                      <input
                        type="date"
                        name="warrantyDate"
                        id="warranty"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.warrantyDate}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formik.touched.warrantyDate &&
                        formik.errors.warrantyDate && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.warrantyDate}
                          </p>
                        )}
                    </div>

                    {/* orgin input */}
                    <div className="flex flex-col space-y-1 mb-3">
                      <label
                        htmlFor="origin"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Origin
                      </label>
                      <input
                        type="text"
                        name="origin"
                        id="origin"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.origin}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.origin && formik.errors.origin && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.origin}
                        </p>
                      )}
                    </div>

                    {/* status input */}
                    <div className="flex flex-col space-y-1 mb-8">
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Status
                      </label>
                      <input
                        type="text"
                        name="status"
                        id="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.status}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      ></input>
                      {formik.touched.status && formik.errors.status && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className="float-right bg-blue-600 text-white py-2 px-5 rounded-md mt-5 hover:bg-blue-500"
                  >
                    Update Facility
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

export default FacilityUpdate;
