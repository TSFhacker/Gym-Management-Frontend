import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
// import Dropzone from "react-dropzone";
// import { useDropzone } from 'react-dropzone';
import api from "../../utils/api";

import { FaDollarSign } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import TheSpinner from "../../layout/TheSpinner";
import { useParams } from "react-router-dom";

const AddFeedback = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.ui.addPrductLoading);

  const userId = useSelector((state) => state.auth.id);
  const [tnail, setTnail] = useState("");
  const [pImages, setPImages] = useState("");

  const { product } = useParams();

  const thumbnailHandler = (file) => {
    console.log("thumbnail: ", file);
    setTnail(file);
  };

  const imagesHandler = (event) => {
    const imageArray = [];
    for (let i = 0; i < event.target.files.length; i++) {
      imageArray.push(event.target.files[i]);
    }
    setPImages(imageArray);
  };

  const initialValues = {
    feedback_content: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      feedback_content: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await api.post("api/feedback", {
          memberId: { memberId: userId },
          ...values,
          feedback_type: 0,
        });
        formik.resetForm(initialValues);
        swal({
          title: "Feedback Created!",
          icon: "success",
          button: "OK!",
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  // const onDrop = useCallback((acceptedFiles) => {
  //   if (acceptedFiles.length !== 4) {
  //     return;
  //   }
  //   formik.setFieldValue("images", formik.values.images.concat(acceptedFiles))
  // }, [formik])

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div>
      <div className="flex items-center p-8 mx-4 my-8 bg-white shadow-2xl drop-shadow-md">
        <span className="mr-6 text-4xl text-primary">
          <IoMdAddCircle />
        </span>
        <h2 className="text-4xl font-semibold tracking-widest uppercase">
          New feedback
        </h2>
      </div>
      <div className="flex p-8 m-4 bg-white shadow-lg">
        <div className="w-3/4">
          <form onSubmit={formik.handleSubmit}>
            {/* name input */}
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="feedback_content" className="tracking-wider">
                Feedback content:
              </label>
              <input
                type="text"
                name="feedback_content"
                id="feedback_content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.feedback_content}
                className="w-full bg-gray-100 rounded form-input"
                placeholder="Enter feedback"
              />
              {formik.touched.feedback_content &&
                formik.errors.feedback_content && (
                  <p className="text-xs font-semibold text-red-500">
                    {formik.errors.feedback_content}
                  </p>
                )}
            </div>
            {/* description input
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="description" className="tracking-wider">
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="w-full bg-gray-100 rounded-md form-textarea h-52"
                placeholder="Product description"
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>
            {/* price input 
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="price" className="tracking-wider">
                Price:
              </label>
              <div className="flex">
                <span className="flex items-center justify-center px-3 py-2 text-black bg-gray-300 border border-r-0 border-gray-300">
                  <FaDollarSign />
                </span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="any"
                  min="0"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  className="w-full bg-gray-100 rounded-r form-input"
                  placeholder="Product price"
                />
              </div>
              {formik.touched.price && formik.errors.price && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.price}
                </p>
              )}
            </div>
            {/* category input 
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="category" className="tracking-wider">
                Category:
              </label>
              <select
                name="category"
                id="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className="bg-gray-100 form-select"
              >
                <option value=""></option>
                <option value="desktop">Desktop</option>
                <option value="laptop">Laptop</option>
                <option value="printer">Printer</option>
                <option value="scanner">Scanner</option>
                <option value="tablet">Tablet</option>
                <option value="monitor">Monitor</option>
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.category}
                </p>
              )}
            </div>
            {/* brand input 
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="brand" className="mb-3 tracking-wider">
                Brand:
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="brand"
                    id="apple"
                    value="apple"
                    onChange={formik.getFieldProps("brand").onChange}
                    className="form-radio"
                  />
                  <label htmlFor="apple" className="tracking-widest">
                    Apple
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="brand"
                    id="dell"
                    value="dell"
                    onChange={formik.getFieldProps("brand").onChange}
                    className="form-radio"
                  />
                  <label htmlFor="dell" className="tracking-widest">
                    Dell
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="brand"
                    id="hp"
                    value="hp"
                    onChange={formik.getFieldProps("brand").onChange}
                    className="form-radio"
                  />
                  <label htmlFor="hp" className="tracking-widest">
                    HP
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="brand"
                    id="samsung"
                    value="samsung"
                    onChange={formik.getFieldProps("brand").onChange}
                    className="form-radio"
                  />
                  <label htmlFor="samsung" className="tracking-widest">
                    Samsung
                  </label>
                </div>
              </div>
              {formik.touched.brand && formik.errors.brand && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.brand}
                </p>
              )}
            </div>
            {/* shipping input 
            <div className="flex items-center mb-8 space-x-3">
              <input
                type="checkbox"
                name="shipping"
                id="shipping"
                onChange={() =>
                  formik.setFieldValue("shipping", !formik.values.shipping)
                }
                value={formik.values.shipping}
                className="form-checkbox"
              />
              <label htmlFor="shipping" className="tracking-wider">
                Free shipping
              </label>
            </div>
            {/* thumbnail input 
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="thumbnail" className="tracking-wider">
                Thumbnail:
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                // onChange={(event) => {
                //   formik.setFieldValue("thumbnail", () => {
                //     const fd = new FormData();
                //     fd.append('thumbnail', event.currentTarget.files[0]);
                //     return fd;
                //   });
                // }}
                // onChange={(event) => {
                //   formik.setFieldValue('thumbnail', event.target.files[0]);
                // }}
                onChange={(e) => thumbnailHandler(e.target.files[0])}
                className="w-full"
              />
              {formik.touched.thumbnail && formik.errors.thumbnail && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.thumbnail}
                </p>
              )}
            </div>
            {/* images input 
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="images" className="tracking-wider">
                Product Images:
              </label>
              <input
                type="file"
                name="images[]"
                id="images"
                accept="image/*"
                // onChange={(event) => {
                //   // formik.setFieldValue("images", event.currentTarget.files)
                //   formik.setFieldValue("images", () => {
                //     const fd = new FormData();
                //     fd.append('images', event.target.files);
                //     return fd;
                //   })
                // }}
                onChange={imagesHandler}
                multiple
              />
              <p className="text-xs">Upload 4 images *</p> */}
            {/* <div className="w-full h-auto bg-gray-500" {...getRootProps()} >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                  <p>Drop the images here ...</p> :
                  <p>Drag 'n' Drop 4 images here, or click the select images</p>
                }
              </div> */}
            {/* <Dropzone className="w-full h-auto rounded" accept="image/*" onDrop={(acceptedFiles) => {
                    if (acceptedFiles.length === 0) {
                        return;
                    }
                    formik.setFieldValue('images', formik.values.images.concat(acceptedFiles))
                }}>
                    {() => {
                        if (formik.values.images.length === 0) {
                            return <p>Upload 4 product images</p>
                        }
                    }}
                </Dropzone> */}
            {/* {formik.touched.thumbnail && formik.errors.thumbnail && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.thumbnail}
                </p>
              )} 
            </div>*/}
            <hr />
            {loading ? (
              <TheSpinner />
            ) : (
              <button
                type="submit"
                className="block px-4 py-2 mt-3 ml-auto border rounded-md text-primary border-primary hover:text-white hover:bg-primary"
              >
                Send feedback
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFeedback;
