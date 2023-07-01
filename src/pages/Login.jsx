import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

import { MdEmail } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/auth-actions";
import { useNavigate } from "react-router-dom";
import TheSpinner from "../layout/TheSpinner";
import api from "../utils/api";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role) navigate(role);
  }, [role]);
  const loading = useSelector((state) => state.ui.loginLoading);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(login(values));
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <motion.div
      className="w-[80%] mx-auto mt-40 mb-52"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-[320px] sm:w-[400px] rounded shadow-xl border-2 border-solid px-4 sm:px-8 py-20 mx-auto">
        <h2 className="mb-12 text-3xl font-bold tracking-wider text-center uppercase select-none">
          <span className="text-primary">Gym </span>
          <span className="text-secondary-200">Management</span>
        </h2>
        {loading ? (
          <TheSpinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-4 space-y-1">
              <label
                htmlFor="username"
                className="font-semibold tracking-wider"
              >
                Username
              </label>
              <div className="flex py-1">
                <span className="flex items-center justify-center px-3 py-2 text-black bg-gray-300 border border-r-0 border-gray-300">
                  <MdEmail />
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="w-full rounded-r form-input"
                  placeholder="example@domain.com"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs font-semibold text-red-600">
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4 space-y-1">
              <label
                htmlFor="password"
                className="font-semibold tracking-wider"
              >
                Password
              </label>
              <div className="flex py-1">
                <span className="flex items-center justify-center px-3 py-2 text-black bg-gray-300 border border-r-0 border-gray-300">
                  <RiLockPasswordFill />
                </span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full rounded-r form-input"
                  placeholder="********"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-600">{formik.errors.password}</p>
              )}
            </div>
            <hr />
            <button
              type="submit"
              className="block px-4 py-2 mt-3 ml-auto border rounded-md text-primary border-primary hover:text-white hover:bg-primary"
            >
              <span className="inline-flex mr-1 justify-items-center">
                <FiLogIn />{" "}
              </span>
              Login
            </button>
          </form>
        )}
        <p className="mt-6 text-center">
          Not registered?{" "}
          <Link to="/register" className="text-primary">
            Create an account
          </Link>{" "}
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
