import React, { useState, useEffect } from "react";
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

const MemberRegistration = () => {
  const [memberships, setMemberships] = useState([]);
  const [registration, setRegistration] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [reload, setReload] = useState(false);

  const [select, setSelect] = useState(null);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    api.get("api/memberships").then((res) => setMemberships(res.data));
    api.get("api/v1/trainer").then((res) => setTrainers(res.data));
    api.get("api/registrations").then((res) => {
      setRegistration(
        res.data.findLast((item) => item.memberId.memberId === userId)
      );
    });
  }, [reload]);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.ui.addPrductLoading);

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
    trainingClass: "",
    trainer: "",
    type: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      trainingClass: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const post = {
          registrationDate: new Date().toISOString(),
          registrationType: values.type,
          memberId: { memberId: Number(userId) },
          membershipId: { membershipId: Number(values.trainingClass) },
          trainerId: { id: 1 },
        };
        if (values.trainer) post.trainerId = { id: Number(values.trainer) };

        await api.post("api/registrations", post);
        formik.resetForm(initialValues);
        swal({
          title: "Successful!",
          icon: "success",
          button: "OK!",
        });
        setReload((prev) => !prev);
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

  const handleChange = (e) => {
    setSelect(memberships.find((mem) => mem.membershipId == e.target.value));
  };

  return (
    <div>
      <div className="flex items-center p-8 mx-4 my-8 bg-white shadow-2xl drop-shadow-md">
        <span className="mr-6 text-4xl text-primary">
          <IoMdAddCircle />
        </span>
        <h2 className="text-4xl font-semibold tracking-widest uppercase">
          Registration
        </h2>
      </div>
      <div className="flex flex-col p-8 m-4 bg-white shadow-lg gap-y-5">
        <div className="text-xl font-bold">Current membership</div>
        <div className="grid grid-cols-2">
          <div>
            <div>
              <span className="font-bold">Training class:</span>{" "}
              {registration?.membershipId.trainingClass}
            </div>
            <div>
              <span className="font-bold">Training card type:</span>{" "}
              {registration?.membershipId.trainingCardType}
            </div>
            <div>
              <span className="font-bold">Number of Sessions: </span>{" "}
              {registration?.membershipId.numberOfSession}
            </div>
            <div>
              <span className="font-bold">Price:</span>{" "}
              {registration?.membershipId.price}$
            </div>
            <div>
              <span className="font-bold">Training time:</span>{" "}
              {registration?.membershipId.trainingTime}h
            </div>
            <div>
              <span className="font-bold">Registration type:</span>{" "}
              {registration?.registrationType}
            </div>
          </div>
          {registration?.membershipId.includingTrainer && (
            <div className="">
              <div className="text-lg font-bold">Your personal trainer</div>
              <div>Name: {registration?.trainerId.name}</div>
              <div>Phone number: {registration?.trainerId.phoneNum}</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-8 m-4 bg-white shadow-lg">
        <div className="mb-5 text-xl font-bold">Change membership</div>
        <div className="w-3/4">
          <form onSubmit={formik.handleSubmit}>
            {/* name input */}
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="feedback_content" className="tracking-wider">
                Training class:
              </label>
              <select
                name="trainingClass"
                id="trainingClass"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.trainingClass}
                className="bg-gray-100 form-select"
              >
                <option value="">Choose a training class</option>
                {memberships?.map((member) => (
                  <option key={member.membershipId} value={member.membershipId}>
                    {member.trainingClass}
                  </option>
                ))}
              </select>
              {formik.touched.trainingClass && formik.errors.trainingClass && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.trainingClass}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-8 space-y-1">
              <label htmlFor="feedback_content" className="tracking-wider">
                Registration type:
              </label>
              <select
                name="type"
                id="type"
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.type}
                className="bg-gray-100 form-select"
              >
                <option value="">Choose a registraion type</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthy</option>
              </select>
              {formik.touched.type && formik.errors.type && (
                <p className="text-xs font-semibold text-red-500">
                  {formik.errors.type}
                </p>
              )}
            </div>
            {select && (
              <>
                <div>
                  <div>Class info</div>
                  <div>Price: {select.price}$</div>
                  <div>Type: {select.trainingCardType}</div>
                  <div>Number of sessions: {select.numberOfSession}</div>
                </div>
                {select.includingTrainer && (
                  <div className="flex flex-col mb-8 space-y-1">
                    <label
                      htmlFor="feedback_content"
                      className="tracking-wider"
                    >
                      Select personal trainer:
                    </label>
                    <select
                      name="trainer"
                      id="trainer"
                      onChange={(e) => {
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik.values.trainer}
                      className="bg-gray-100 form-select"
                    >
                      {trainers?.map((trainer) => (
                        <option key={trainer.id} value={trainer.id}>
                          {trainer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
            <hr />
            {loading ? (
              <TheSpinner />
            ) : (
              <button
                type="submit"
                className="block px-4 py-2 mt-3 ml-auto border rounded-md text-primary border-primary hover:text-white hover:bg-blue-600"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberRegistration;
