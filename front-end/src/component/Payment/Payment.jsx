import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import axios, { Axios } from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    orderData.paymentInfo = {
      type: "Thanh toán khi nhận hàng",
      status: "Đang xử lý",
    };

    const list = orderData.cart;
    list.forEach(async (item) => {
      const quantityUpdate = item.quantity - item.qty;
      const newItem = {
        ...item,
        quantity: quantityUpdate,
      };
      await axios
        .put(`${server}/product/${item._id}`, newItem, config)
        .then((res) => {
          console.log("update product", res);
        });
    });

    await axios
      .post(`${server}/order/create-order`, orderData, config)
      .then((res) => {
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo cashOnDeliveryHandler={cashOnDeliveryHandler} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({ cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(3);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Thanh toán khi nhận hàng
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Xác nhận"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  const totalPrice = orderData?.cart?.reduce(
    (acc, item) => acc + item.discount_price * item.qty,
    0
  );
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Số tiền thanh toán:
        </h3>
        <h5 className="text-[18px] font-[600]">${totalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Phí ship:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.amountPayment}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
