import React from "react";
import Header from "../component/layout/Header.jsx";
import Hero from "../component/route/hero/Hero.jsx";
import Categories from "../component/route/Categories/Categories.jsx";
import BestDeals from "../component/route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../component/route/FeaturedProduct/FeaturedProduct.jsx";
import Events from "../component/events/Events.jsx";

const HomePage = () => {
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
    </>
  );
};

export default HomePage;
