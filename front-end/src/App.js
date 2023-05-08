import React, { useEffect } from "react";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/route/ProtectedRoute";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/activation/:active_Token" element={<ActivePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:name" element={<ProductDetailPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            {/* No done */}
            <Route path="/payment" element={<CheckoutPage />} />
            <Route path="/checkout" element={<PaymentPage />} />
            <Route path="/order/success/:id" element={<OrderSuccessPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
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
