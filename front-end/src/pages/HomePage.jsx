import React, { useEffect } from "react";
import Header from "../component/layout/Header.jsx";
import Hero from "../component/route/hero/Hero.jsx";
import Categories from "../component/route/Categories/Categories.jsx";
import BestDeals from "../component/route/BestDeals/BestDeals.jsx";
import FeaturedProduct from "../component/route/FeaturedProduct/FeaturedProduct.jsx";
import Events from "../component/events/Events.jsx";
import Sponsored from "../component/route/Sponsored/Sponsored.jsx";
import Footer from "../component/layout/Footer.jsx";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </>
  );
};

export default HomePage;
