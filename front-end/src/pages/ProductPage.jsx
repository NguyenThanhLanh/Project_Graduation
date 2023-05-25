import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../component/route/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../redux/actions/product";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { productData } = useSelector((state) => state.productData);
  const categoryData = searchParams.get("category");
  console.log("danh muc:", categoryData);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const allProductData = productData ? [...productData] : [];
    if (categoryData === null) {
      const d =
        allProductData &&
        allProductData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        allProductData &&
        allProductData.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [productData]);

  useEffect(() => {
    dispatch(loadProduct());
    const allProductData = productData ? [...productData] : [];
    if (categoryData === null) {
      const d =
        allProductData &&
        allProductData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        allProductData &&
        allProductData.filter((i) => i.category === categoryData);
      setData(d);
    }
    window.scrollTo(0, 0);
  }, []);
  console.log("dataaa: ", productData);
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
