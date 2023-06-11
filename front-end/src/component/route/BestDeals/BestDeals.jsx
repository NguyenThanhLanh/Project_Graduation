import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard.jsx";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { productData } = useSelector((state) => state.productData);
  const [data, setData] = useState([]);
  // console.log("productDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ", productData);
  // console.log("productData", data);

  useEffect(() => {
    const allProductData = productData ? [...productData] : [];
    allProductData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = allProductData.slice(0, 5);
    setData(firstFive);
  }, []);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Sản phẩm bán chạy</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
