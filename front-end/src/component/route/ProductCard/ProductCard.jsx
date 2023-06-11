import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard.jsx";
import { server } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";

const ProductCard = ({ data }) => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const product_id = data._id;

  const addToCartHandle = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (user) {
      if (isItemExists) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
      } else {
        if (data.quantity < 1) {
          toast.error("Sản phẩm đã hết hàng");
        } else {
          const cartData = { ...data, qty: 1 };
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập!");
    }
  };

  // console.log("Tên của sản phẩm được hconj: ", open);

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_id}`}>
          <img
            src={`${server}/${data.image_Url[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />

          <h4 className="pb-3 font-[500] mt-[30px]">
            {data.name.length > 40
              ? data.name.slice(0, 40) + " ..."
              : data.name}
          </h4>

          <div className="flex ">
            <AiFillStar
              className="mr-2 cursor-pointer "
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer "
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer "
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer "
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer "
              size={20}
              color="#F6BA00"
            />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
            </div>
          </div>
        </Link>
        {/* side options */}
        <div>
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute z-5 right-2 top-16"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={22}
            className="cursor-pointer absolute z-5 right-2 top-28"
            onClick={() => addToCartHandle(data._id)}
            color="#333"
            title="Add to cart"
          />
          {open ? (
            <ProductDetailCard
              open={open}
              setOpen={setOpen}
              data={data}
              cart={cart}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
