import React from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import CheckoutSteps from "../component/Checkout/CheckoutSteps";
import Payment from "../component/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
