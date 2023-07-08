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
  const [registration, setRegistration] = useState(null);
  const [histories, setHistories] = useState([]);

  const [select, setSelect] = useState(null);
  const { id } = useParams();
  const user_id = useSelector((state) => state.auth.id);
  const userId = id ? parseInt(id) : user_id;

  useEffect(() => {
    api.get("/api/registrations").then(({ data }) => {
      console.log(data);
      const filtered = data?.filter((his) => his.memberId.memberId === userId);
      setHistories(filtered);
      setRegistration(
        data.findLast((item) => item.memberId.memberId === userId)
      );
    });
  }, []);

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
              <div className="text-lg font-bold">Personal trainer</div>
              <div>Name: {registration?.trainerId.name}</div>
              <div>Phone number: {registration?.trainerId.phoneNum}</div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col p-8 m-4 bg-white shadow-lg">
        <div className="font-bold text-lg">Membership history</div>
        {histories?.map((his) => (
          <div className="bg-white mx-4 p-8 shadow-lg space-y-12">
            <div className="flex space-x-6 border border-white rounded-lg shadow-lg p-4 items-center">
              <div className="overflow-hidden cursor-pointer">
                <img
                  className="w-[300px] h-[200px] object-contain rounded transform hover:scale-105 transition-all duration-300"
                  src={
                    "https://levelfyc.com/wp-content/uploads/2021/09/lou-3803.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg tracking-widest my-4">
                  {his.membershipId?.trainingClass}
                </h2>
                <span className="block text-secondary-100 font-bold text-sm">
                  Price: {his.membershipId?.price}
                </span>
                <span className="block text-secondary-100 font-bold text-sm">
                  Type: {his.membershipId?.trainingCardType}
                </span>
                {his.membershipId?.includingTrainer && (
                  <span className="block text-secondary-100 font-bold text-sm">
                    Including personal trainer
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberRegistration;
