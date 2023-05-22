import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import { useDispatch } from "react-redux";

const ProductDetailCard = ({ setOpen, data, cart }) => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) setCount(count - 1);
  };
  const addToCartHandler = (data) => {
    if (user) {
      const isItemExists = cart && cart.find((i) => i._id === data._id);
      if (isItemExists) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
      } else {
        if (data.quantity < 1) {
          toast.error("Sản phẩm đã hết hàng");
        } else {
          dispatch(addTocart(data));
          toast.success("Item added to cart successfully!");
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập!");
    }
  };

  const handleMessageSubmit = () => {};
  return (
    <div>
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${server}/${data.image_Url[0]}`}
                  alt="Product images"
                  className="w-[380px] h-[320px]"
                />

                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                {/* product title */}
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                {/* description */}
                <p>{data.description}</p>
                {/* price */}
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* count */}
                  <div className="flex">
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l flex items-center justify-center w-[41px] h-[42px] shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium flex items-center justify-center w-[41px] h-[42px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r flex items-center justify-center w-[41px] h-[42px] shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler({ ...data, qty: count })}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailCard;
