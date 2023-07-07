import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiPencilSquare } from "react-icons/hi2"
import api from "../../../utils/api";

const MemberhshipDetail = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [membership, setMembership] = useState({});

  useEffect(() => {
    api
      .get(`api/memberships/${id}`)
      .then((res) => {
        setMembership(res.data);
      })
      .catch((error) => {});
  }, [id]);

  const formik = useFormik({
    initialValues: {
      membershipName: membership.membershipName,
      trainingTime: membership.trainingTime,
      price: membership.price,
      pricePerMonth: membership.pricePerMonth,
      pricePerDay: membership.pricePerDay,
      numberOfSession: membership.numberOfSession,
      trainingCardType: membership.trainingCardType,
      includingTrainer: membership.includingTrainer,
      trainingClass: membership.trainingClass,
      description: membership.description,
    },
    validationSchema: Yup.object({
      membershipName: Yup.string().required("Required"),
      trainingTime: Yup.number().required("Required"),
      price: Yup.number().required("Required"),
      pricePerMonth: Yup.number().required("Required"),
      pricePerDay: Yup.number().required("Required"),
      numberOfSession: Yup.string().required("Required"),
      trainingCardType: Yup.string().required("Required"),
      includingTrainer: Yup.bool().required("Required"),
      trainingClass: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
  });

  return (
    <div className="w-full flex h-full">
      <div className="w-full bg-gray-100">
        <div className="px-[50px] mt-[20px]">
          <div>
            <div className="mx-4">
              <button
                className="px-4 text-lg uppercase tracking-widest bg-secondary-100rounded-lg drop-shadow-lg"
                onClick={() => navigate("/admin/membership")}
              >
                <span className="mr-2 inline-block">
                  {<HiChevronDoubleLeft />}
                </span>
                Back to memberships
              </button>
            </div>
            <div className="flex flex-col py-8 px-[200px] mt-2 bg-white shadow-lg">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  {/* Name input */}
                  <div className="flex flex-col space-y-1 mb-3">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Membership Name
                    </label>
                    <input
                      disabled
                      type="text"
                      name="membershipName"
                      id="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.membershipName}
                      className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                    ></input>
                    {formik.touched.membershipName &&
                      formik.errors.membershipName && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.membershipName}
                        </p>
                      )}
                  </div>
                  {/* des */}
                  <div className="flex flex-col space-y-1 mb-3">
                    <label
                      htmlFor="des"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white disabled:bg-slate-100"
                    >
                      Descripton
                    </label>
                    <textarea
                      disabled
                      type="text"
                      rows={2}
                      name="description"
                      id="des"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                    ></textarea>
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {/* time input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Training Time
                      </label>
                      <input
                        disabled
                        type="number"
                        name="trainingTime"
                        id="type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.trainingTime}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                      ></input>
                      {formik.touched.trainingTime &&
                        formik.errors.trainingTime && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.trainingTime}
                          </p>
                        )}
                    </div>
                    {/* price input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 disabled:bg-slate-100">
                          $
                        </span>
                        <input
                          disabled
                          type="text"
                          name="price"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                          id="price"
                          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                        />
                      </div>
                      {formik.touched.price && formik.errors.price && (
                        <p className="text-xs font-semibold text-red-500">
                          {formik.errors.price}
                        </p>
                      )}
                    </div>
                    {/* price input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="priceM"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price per Month
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          $
                        </span>
                        <input
                          disabled
                          type="text"
                          name="pricePerMonth"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pricePerMonth}
                          id="priceM"
                          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                        />
                      </div>
                      {formik.touched.pricePerMonth &&
                        formik.errors.pricePerMonth && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.pricePerMonth}
                          </p>
                        )}
                    </div>
                    {/* price input */}
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="priceD"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price per Day
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                          $
                        </span>
                        <input
                          disabled
                          type="text"
                          name="pricePerDay"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.pricePerDay}
                          id="priceD"
                          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm roundedr--lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                        />
                      </div>
                      {formik.touched.pricePerDay &&
                        formik.errors.pricePerDay && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.pricePerDay}
                          </p>
                        )}
                    </div>
                    {/* type input */}
                    <div className="flex flex-col space-y-1 mb-3">
                      <label
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Training Type
                      </label>
                      <input
                        disabled
                        type="text"
                        name="trainingCardType"
                        id="type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.trainingCardType}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                      ></input>
                      {formik.touched.trainingCardType &&
                        formik.errors.trainingCardType && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.trainingCardType}
                          </p>
                        )}
                    </div>
                    {/* section input */}
                    <div className="flex flex-col space-y-1 mb-3">
                      <label
                        htmlFor="sct"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Section
                      </label>
                      <input
                        disabled
                        type="number"
                        name="numberOfSession"
                        id="sct"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.numberOfSession}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                      ></input>
                      {formik.touched.numberOfSession &&
                        formik.errors.numberOfSession && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.numberOfSession}
                          </p>
                        )}
                    </div>
                    {/* class */}
                    <div className="flex flex-col space-y-1 mb-3">
                      <label
                        htmlFor="class"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Class
                      </label>
                      <select
                        disabled
                        id="class"
                        name="trainingClass"
                        onChange={formik.handleChange}
                        value={formik.values.trainingClass}
                        onBlur={formik.handleBlur}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                      >
                        <option value="Class A">Class A</option>
                        <option value="Class B">Class B</option>
                        <option value="Class C">Class C</option>
                        <option value="Class D">Class D</option>
                        <option value="Class E">Class E</option>
                      </select>
                      {formik.touched.trainingClass &&
                        formik.errors.trainingClass && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.trainingClass}
                          </p>
                        )}
                    </div>
                    {/* trainer */}
                    <div className="flex flex-col space-y-1 mb-3">
                      <label
                        htmlFor="trainer"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Trainer
                      </label>
                      <select
                        disabled
                        id="trainer"
                        name="includingTrainer"
                        onChange={formik.handleChange}
                        value={formik.values.includingTrainer}
                        onBlur={formik.handleBlur}
                        className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-slate-100"
                      >
                        <option value={true}>Include Trainer</option>
                        <option value={false}>No Include Trainer</option>
                      </select>
                      {formik.touched.includingTrainer &&
                        formik.errors.includingTrainer && (
                          <p className="text-xs font-semibold text-red-500">
                            {formik.errors.includingTrainer}
                          </p>
                        )}
                    </div>
                  </div>
                </form>
              </div>
              <Link to={`/admin/membership/${id}/edit`}>
                <button className="flex items-center  gap-1 float-right bg-blue-600 text-white py-2 px-3 rounded-md mt-5 hover:bg-blue-500">
                  <HiPencilSquare />
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberhshipDetail;
