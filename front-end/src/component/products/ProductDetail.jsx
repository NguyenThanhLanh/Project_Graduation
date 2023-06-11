import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { server } from "../../server";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
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
  // console.log("Trang chi tiết sản phẩm: ", data);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${server}/${data.image_Url[select]}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data?.image_Url.map((item, index) => {
                    return (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } cursor-pointer`}
                        key={index}
                      >
                        <img
                          src={`${server}/${item}`}
                          alt=""
                          className="h-[200px]"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full 800px:w-[50%]">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="text-justify mt-6">{data.description}</p>
                <p className="text-justify mt-6">
                  <b>Nhà cung cấp: </b>
                  {data.suppiler}
                </p>
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

                {/* CART button */}
                <div
                  className={`${styles.button} mt-6 !rounded h-11 flex items-center`}
                  onClick={() => addToCartHandler({ ...data, qty: count })}
                >
                  <span className="text-white flex items-center">
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

export default ProductDetail;
