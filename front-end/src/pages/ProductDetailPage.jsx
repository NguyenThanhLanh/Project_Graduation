import React, { useEffect, useState } from "react";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
import ProductDetail from "../component/products/ProductDetail.jsx";
import SuggestedProduct from "../component/products/SuggestedProduct.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";

const ProductDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  console.log("product name:", productName);
  console.log(productName);

  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, []);
  console.log("dữ liệu: ", data);
  return (
    <div>
      <Header />
      <ProductDetail data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
