import React, { useEffect } from "react";
import { Routes, Route, useLocation, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/actions/products-actions";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import MainNavigation from "./layout/MainNavigation";
import Footer from "./layout/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import TheProducts from "./components/dashboard/TheProducts";
import AddProduct from "./components/dashboard/AddProduct";
import UpdateProducts from "./components/dashboard/UpdateProducts";
import ProductUpdate from "./components/dashboard/ProductUpdate";

import LoginRedirect from "./components/auth/LoginRedirect";
import RegisterRedirect from "./components/auth/RegisterRedirect";
import DashboardRedirect from "./components/auth/DashboardRedirect";
import HomeRedirect from "./components/auth/HomeRedirect";

// import MemberHistory from "./pages/member/history";
import ListMember from "./pages/staff/ListMember";
import Facility from "./pages/admin/Facility";

import MemberHistory from "./pages/member/history";
import MemberInfo from "./pages/member/info";
import MemberFeedback from "./pages/member/feedback";
import FacilityUpdate from "./pages/admin/FacilityUpdate";
import Membership from "./pages/admin/Membership";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
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

          <Route element={<RegisterRedirect />}>
            <Route path="/register" element={<Register />} />
          </Route>

          <Route>
            <Route path="admin" element={<Dashboard />}>
              <Route path="facility" element={<Facility />} />
              <Route path="facility/:id/update" element={<FacilityUpdate />} />
              <Route path="membership" element={<Membership />} />
            </Route>
          </Route>
          <Route path="staff" element={<ListMember />} />

          <Route>
            <Route path="trainer" element={<Dashboard />}>
              <Route path=":product" element={<TheProducts />} />
              <Route path="add:product" element={<AddProduct />} />
              <Route path="update:product">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route>
            </Route>
          </Route>

          <Route>
            <Route path="member" element={<Dashboard />}>
              {/* <Route path="history" element={<MemberHistory />} /> */}
              <Route path="update:product">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route>

              {/* <Route path="add:product" element={<AddProduct />} />
              <Route path=":product" element={<TheProducts />} />
              <Route path="update:product">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route> */}
            </Route>
          </Route>

          {/* <Route>
            {["admin", "staff", "trainer", "member"].map((path) => (
              <Route path={path} element={<Dashboard />}>
                <Route path=":product" element={<TheProducts />} />
                <Route path="add:product" element={<AddProduct />} />
                <Route path="update:product">
                  <Route index element={<UpdateProducts />} />
                  <Route path=":productId" element={<ProductUpdate />} />
                </Route>
              </Route>
            ))}
          </Route> */}

          {/* <Route>
            <Route path="staff" element={<Dashboard />}>
              <Route path="products" element={<TheProducts />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="updateproducts">
                <Route index element={<UpdateProducts />} />
                <Route path=":productId" element={<ProductUpdate />} />
              </Route>
            </Route>
          </Route> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
