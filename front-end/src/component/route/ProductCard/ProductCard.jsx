import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard.jsx";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  const removeFromWishlistHandler = () => {};
  const addToWishlistHandler = () => {};

  console.log("aaaaaaaaa: ", open);

  return (
    <>
      <div className="w-full h-[350px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          <img
            src={data.image_Url[0].url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
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

          {/* side options */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => setClick(!click)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => setClick(!click)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-16"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={22}
              className="cursor-pointer absolute right-2 top-28"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Add to cart"
            />
            {open ? (
              <ProductDetailCard open={open} setOpen={setOpen} data={data} />
            ) : null}
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
