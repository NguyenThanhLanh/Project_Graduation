import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  SignInPage,
  SignUpPage,
  ActivePage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  PaymentPage,
  CheckoutPage,
  OrderSuccessPage,
  ProductDetailPage,
  ProfilePage,
} from "./Routes.js";

import {
  AdminDashboardPage,
  CreateProductPage,
  AdminGetProductPage,
  AdminGetOrderPage,
  AdminGetEventPage,
  AdminCreateEventPage,
  AdminGetAllSupplierPage,
  AdminCreateSupplierPage,
} from "./AdminRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/route/ProtectedRoute";
import ProjectAdminRoute from "./component/route/ProjectAdminRoute";
import { loadProduct } from "./redux/actions/product";
import { loadCategories } from "./redux/actions/category";
import { loadSuppiler } from "./redux/actions/suppiler";
import { getAllEvent } from "./redux/actions/event";
import { loadAllOrderAdmin } from "./redux/actions/order";

const App = () => {
  const { loading } = useSelector((state) => state.user);
  const isAuthenticated = localStorage.getItem("user") ? true : false;
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Giá trị khởi tạo:----------------------", isAuthenticated, user);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadProduct());
    Store.dispatch(loadCategories());
    Store.dispatch(loadSuppiler());
    Store.dispatch(getAllEvent());
  }, []);
  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/activation/:active_Token" element={<ActivePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            {/* No done */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> */}
            {/* <Route
              path="/admin/create-product"
              element={<CreateProductPage />}
            />
            <Route path="/admin/products" element={<AdminGetProductPage />} />
            <Route path="/admin/orders" element={<AdminGetOrderPage />} />
            <Route path="/admin/events" element={<AdminGetEventPage />} />
            <Route
              path="/admin/create-event"
              element={<AdminCreateEventPage />}
            /> */}

            <Route
              path="/admin/dashboard"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminDashboardPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/create-product"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <CreateProductPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminGetProductPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminGetOrderPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminGetEventPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/create-event"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminCreateEventPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/supplier"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminGetAllSupplierPage />
                </ProjectAdminRoute>
              }
            />
            <Route
              path="/admin/create-supplier"
              element={
                <ProjectAdminRoute
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <AdminCreateSupplierPage />
                </ProjectAdminRoute>
              }
            />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
