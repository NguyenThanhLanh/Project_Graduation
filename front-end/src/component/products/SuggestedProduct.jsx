import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../route/ProductCard/ProductCard";
import { productData } from "../../static/data";

const SuggestedProduct = ({ data }) => {
  const [product, setProductData] = useState(null);
  console.log("các sản phẩm liên quan: ", data.category);

  useEffect(() => {
    const prod =
      productData && productData.filter((i) => i.category === data.category);
    setProductData(prod);
  }, []);
  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {product &&
              product.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
