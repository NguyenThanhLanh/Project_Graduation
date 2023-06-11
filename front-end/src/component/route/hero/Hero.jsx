import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import image from "../../../assets/image-static/banner-bhldong1-1.jpg";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
    >
      <img src={image} alt="Banner" className="w-full h-full" />
      {/* <div className={`${styles.section} w-[90%] 800px:w-[60%] pt-20`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[40px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Chào mừng đến với
          <br /> bảo hộ lao đông Dương Châu.
        </h1>
        <p className="pt-5 text-[18px] italic font-[400] text-[#000000ba] capitalize">
          Là Công ty sản xuất kinh doanh thiết bị bảo hộ lao động. Chúng tôi
          luôn đưa ra những sản phẩm đảm bảo chất lượng, an toàn cho người lao
          động, góp phần mang lại lợi ích cho mỗi doanh nghiệp.
        </p>
        <p className="pt-5 text-[18px] font-[Poppins] font-[400] text-[#000000ba] capitalize">
          All For Faith Love, Desire To Protect Workers.
        </p>

        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div> */}
    </div>
  );
};

export default Hero;
