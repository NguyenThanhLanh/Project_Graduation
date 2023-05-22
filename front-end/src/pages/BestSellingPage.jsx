import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import styles from "../styles/styles";
import ProductCard from "../component/route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const { productData } = useSelector((state) => state.productData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      // productData && productData.sort((a, b) => b.total_sell - a.total_sell);
      /* 
        Trong đoạn mã của bạn, biến productData được lấy từ useSelector của Redux, 
        và phương thức sort() được áp dụng lên nó để sắp xếp các phần tử. 
        Tuy nhiên, nếu productData là một mảng chỉ đọc, bạn sẽ không thể thay 
        đổi thứ tự của các phần tử trong đó.
      */
      productData &&
      [...productData].sort((a, b) => b.total_sell - a.total_sell);

    setData(d);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BestSellingPage;
