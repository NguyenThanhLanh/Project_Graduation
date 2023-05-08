import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../component/route/ProductCard/ProductCard";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  console.log("danh muc:", categoryData);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
      console.log("dataa Effect: ", data);
    } else {
      const d =
        productData && productData.filter((i) => i.category === categoryData);
      setData(d);
      console.log("dataa Effect: ", data);
    }
    window.scrollTo(0, 0);
  }, []);
  console.log("dataaa: ", data);
  return (
    <>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
