import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";
import { server } from "../../server";

const EventCard = ({ active, data }) => {
  console.log("000000000000000000000000000000000000000000", data);
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex px-[10px] py-[46px]`}
    >
      <div className="w-full lg:w-[50%] m-auto flex justify-end pr-[50px]">
        <img
          src={`${server}/${data.image_Url}`}
          alt="Product images"
          className="w-[315px] h-[268px]"
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between ">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.price}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discount_price}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>

        {/* count down */}
        <CountDown data={data} />
      </div>
    </div>
  );
};

export default EventCard;
