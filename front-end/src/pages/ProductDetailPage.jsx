import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import ProductDetail from "../component/products/ProductDetail.jsx";
import SuggestedProduct from "../component/products/SuggestedProduct.jsx";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const { productData } = useSelector((state) => state.productData);
  // const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const allProductData = productData ? [...productData] : [];
    const path = location.pathname;
    const id = path.substring(path.lastIndexOf("/") + 1);
    const data = allProductData.find((i) => i._id === id);
    setData(data);
    // console.log("id---------------------------", id);
  }, [location]);

  // console.log("dữ liệu: ", data);
  return (
    <div>
      <Header activeHeading={3} />
      <ProductDetail data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
