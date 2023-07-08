import React, { useEffect } from "react";
import { Routes, Route, useLocation, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/actions/products-actions";
import { AnimatePresence } from "framer-motion";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Products from "./pages/Products";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
// import MainNavigation from "./layout/MainNavigation";
// import Footer from "./layout/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
// import TheProducts from "./components/dashboard/TheProducts";
// import AddProduct from "./components/dashboard/AddProduct";
// import UpdateProducts from "./components/dashboard/UpdateProducts";
// import ProductUpdate from "./components/dashboard/ProductUpdate";

// import LoginRedirect from "./components/auth/LoginRedirect";
import RegisterRedirect from "./components/auth/RegisterRedirect";
// import DashboardRedirect from "./components/auth/DashboardRedirect";
import HomeRedirect from "./components/auth/HomeRedirect";

// import MemberHistory from "./pages/member/history";
import ListMember from "./pages/staff/ListMember";
import ListTrainee from "./pages/trainer/ListTrainee";
import ListFeedback from "./pages/staff/ListFeedBack";

import MemberHistory from "./pages/member/history";
import MemberInfo from "./pages/member/info";
import MemberFeedback from "./pages/member/feedback";
import AddMemberFeedback from "./pages/member/add-feedback";
import MembershipHistory from "./pages/member/membership";
import MemberRegistration from "./pages/member/registration";

// import MemberHistory from "./pages/member/history";
// import MemberInfo from "./pages/member/info";
// import MemberFeedback from "./pages/member/feedback";
// import MemberHistory from "./pages/member/history";

import Facility from "./pages/admin/facility/Facility";
import FacilityUpdate from "./pages/admin/facility/FacilityUpdate";
import FacilityCreate from "./pages/admin/facility/FacilityCreate";
import Membership from "./pages/admin/membership/Membership";
import MembershipCreate from "./pages/admin/membership/MembershipCreate";
import MemberhshipDetail from "./pages/admin/membership/MemberhshipDetail";
import Staff from "./pages/admin/staff/Staff";
import StaffCreate from "./pages/admin/staff/StaffCreate";
import StaffEdit from "./pages/admin/staff/StaffEdit";
import ListGym from "./pages/admin/gym/ListGym";
import GymUpdate from "./pages/admin/gym/GymUpdate";
import GymCreate from "./pages/admin/gym/GymCreate";
import MemberhshipEdit from "./pages/admin/membership/MemberhshipEdit";
import StaffDetail from "./pages/admin/staff/StaffDetail";
import GymDetail from "./pages/admin/gym/GymDetail";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const role = useSelector((state) => state.auth.role);
  // const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useRoutes(
    ["staff", "admin", "owner"].map((path) => ({
      path,
      element: <Dashboard />,
    }))
  );

  return (
    <>
      {/* {!isAdmin && <MainNavigation />} */}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route element={<HomeRedirect />}></Route>

          <Route>
            <Route path="/" element={<Login />} />
          </Route>

          {role === "admin" && (
            <Route>
              <Route path="admin/" element={<Dashboard />}>
                <Route path="facility" element={<Facility />} />
                <Route
                  path="facility/:id/update"
                  element={<FacilityUpdate />}
                />
                <Route path="facility/create" element={<FacilityCreate />} />
                <Route path="membership" element={<Membership />} />
                <Route
                  path="membership/create"
                  element={<MembershipCreate />}
                />
                <Route path="staff" element={<Staff />} />
                <Route path="staff/create" element={<StaffCreate />} />
                <Route path="staff/:id/update" element={<StaffEdit />} />
                <Route path="staff/:id/detail" element={<StaffDetail />} />
                <Route
                  path="membership/:id/detail"
                  element={<MemberhshipDetail />}
                />
                <Route
                  path="membership/:id/update"
                  element={<MemberhshipEdit />}
                />
                <Route path="gym" element={<ListGym />} />
                <Route path="gym/:id/update" element={<GymUpdate />} />
                <Route path="gym/:id/detail" element={<GymDetail />} />
                <Route path="gym/create" element={<GymCreate />} />
                <Route path="member" element={<ListMember />} />
                <Route path="member/:id" element={<MemberRegistration />} />
              </Route>
            </Route>
          )}

          {role === "trainer" && (
            <Route path="trainer" element={<ListTrainee />} />
          )}

          {role === "staff" && (
            <Route>
              <Route path="staff" element={<Dashboard />}>
                <Route path="member" element={<ListMember />} />
                <Route path="member/:id" element={<MemberRegistration />} />
                <Route path="membership" element={<Membership />} />
                <Route
                  path="membership/:id/detail"
                  element={<MemberhshipDetail />}
                />
                <Route path="feedback" element={<ListFeedback />} />
              </Route>
            </Route>
          )}

          {role === "member" && (
            <Route>
              <Route path="member" element={<Dashboard />}>
                <Route path="history" element={<MemberHistory />} />
                <Route path="info" element={<MemberInfo />} />
                <Route path="feedback" element={<MemberFeedback />} />
                <Route path="feedback/add" element={<AddMemberFeedback />} />
                <Route path="registration" element={<MemberRegistration />} />
                <Route path="membership" element={<MembershipHistory />} />
                {/* <Route path="add:product" element={<AddProduct />} />
              <Route path=":product" element={<TheProducts />} />
              <Route path="update:product">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route> */}
              </Route>
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
