import React from "react";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        <div className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>
              1. Địa chỉ giao hàng
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              2. Thanh toán
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;