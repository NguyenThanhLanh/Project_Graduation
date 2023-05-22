import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState(user.address);
  const navigate = useNavigate();

  console.log(user.phone);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (country === "" || city === "" || address === "") {
      toast.error("Vui lòng cùng cùng cấp đầy đủ địa chỉ giao hàng!");
    } else {
      const shippingAddress = {
        address,
        country,
        city,
      };

      const orderData = {
        cart,
        amountPayment,
        shipping,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const TotalPrice = [...cart].reduce(
    (acc, item) => acc + item.qty * item.discount_price,
    0
  );

  // this is shipping cost variable
  const shipping = TotalPrice * 0.01;

  const amountPayment = (TotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            amountPayment={amountPayment}
            shipping={shipping}
            TotalPrice={TotalPrice}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Thanh toán</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  address,
  setAddress,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Địa chỉ giao hàng</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Tên người nhận</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
              disabled
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ email</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
              disabled
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-full">
            <label className="block pb-2">Số điện thoại</label>
            <input
              type="text"
              required
              value={user && user.phone}
              className={`${styles.input} !w-[95%]`}
              disabled
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Quốc gia</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn quốc gia của bạn
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Tỉnh</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn tỉnh của bạn
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-full">
            <label className="block pb-2">Địa chỉ</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div></div>
      </form>
    </div>
  );
};

const CartData = ({ amountPayment, shipping, TotalPrice }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Tổng tiền hàng:
        </h3>
        <h5 className="text-[18px] font-[600]">${TotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Phí ship:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>

      <h5 className="text-[18px] font-[600] text-end pt-3">${amountPayment}</h5>
    </div>
  );
};

export default Checkout;
