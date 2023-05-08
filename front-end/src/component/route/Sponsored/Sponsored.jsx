import React from "react";
import styles from "../../../styles/styles";
import chanelImg from "../../../assets/image-static/trade-mark/chanel.png";
import dolceImg from "../../../assets/image-static/trade-mark/dolce-gabbana.jpg";
import pradaImg from "../../../assets/image-static/trade-mark/prada.jpg";
import versace from "../../../assets/image-static/trade-mark/versace.png";
import burberry from "../../../assets/image-static/trade-mark/burberry.png";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <img
            src={chanelImg}
            alt="trademarkImage"
            style={{ width: "150px", height: "100px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-center">
          <img
            src={dolceImg}
            style={{ width: "150px", height: "100px", objectFit: "contain" }}
            alt="trademarkImage"
          />
        </div>
        <div className="flex items-center">
          <img
            src={pradaImg}
            style={{ width: "150px", height: "100px", objectFit: "contain" }}
            alt="trademarkImage"
          />
        </div>
        <div className="flex items-center">
          <img
            src={versace}
            style={{ width: "150px", height: "100px", objectFit: "contain" }}
            alt="trademarkImage"
          />
        </div>
        <div className="flex items-center">
          <img
            src={burberry}
            style={{ width: "150px", height: "100px", objectFit: "contain" }}
            alt="trademarkImage"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
