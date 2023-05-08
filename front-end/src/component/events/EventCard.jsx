import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://www.istorebangladesh.com/images/thumbs/0000286_macbook-pro-m1_550.png"
          alt="Product images"
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          Best Collection For Home Decoration
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque exercitationem labore vel, dolore quidem
          asperiores, laudantium temporibus soluta optio consequatur aliquam
          deserunt officia. Dolorum saepe nulla provident. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Beatae, assumenda? Quisquam itaque
          exercitationem labore vel, dolore quidem asperiores, laudantium
          temporibus soluta optio consequatur aliquam deserunt officia. Dolorum
          saepe nulla provident.
        </p>
        <div className="flex py-2 justify-between ">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              999$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>

        {/* count down */}
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;