import React from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const FeaturedProduct = () => {
  const { productData } = useSelector((state) => state.productData);

  return (
    <div>
      <div className={`${styles.section} mt-12`}>
        <div className={`${styles.heading}`}>
          <h1>Sản phẩm nổi bậc</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {productData &&
            [...productData].map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
