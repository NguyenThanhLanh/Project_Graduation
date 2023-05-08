import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const WishList = ({ setOpenWishList }) => {
  const cartData = [
    {
      name: "Đồ bảo hộ dương châu",
      description: `Yếm da hàn là đồ bảo hộ lao động cần thiết cho mỗi công nhân khi phải làm việc trong môi trường nóng, dẽ bị cháy....
            Sử dụng chống nhiệt, chống tia lửa hàn, dùng trong ngành cơ khí, luyện kim`,
      price: 200000,
    },
    {
      name: "Đồ bảo hộ dương châu",
      description: `Yếm da hàn là đồ bảo hộ lao động cần thiết cho mỗi công nhân khi phải làm việc trong môi trường nóng, dẽ bị cháy....
            Sử dụng chống nhiệt, chống tia lửa hàn, dùng trong ngành cơ khí, luyện kim`,
      price: 200000,
    },
    {
      name: "Đồ bảo hộ dương châu",
      description: `Yếm da hàn là đồ bảo hộ lao động cần thiết cho mỗi công nhân khi phải làm việc trong môi trường nóng, dẽ bị cháy....
            Sử dụng chống nhiệt, chống tia lửa hàn, dùng trong ngành cơ khí, luyện kim`,
      price: 200000,
    },
  ];

  const totalPrice = cartData.reduce((sum, curr) => sum + curr.price, 0);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishList(false)}
            />
          </div>
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="w-full flex items-center cursor-pointer" />
        <img
          src={`https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg`}
          alt="Item"
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer ml-5"
            tile="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
