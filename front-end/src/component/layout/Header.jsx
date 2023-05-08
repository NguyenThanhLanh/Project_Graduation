import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { productData, categoriesData } from "../../static/data";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { backend_url } from "../../server";
import Cart from "../cart/cart.jsx";
import WishList from "../wishlist/WishList.jsx";

import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    // console.log(window.screenY);
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  console.log(searchData);
  console.log(searchData);
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://sieuthibaoho.net/images/website/logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Nhập sản phẩm cần tìm..."
              value={searchTerm}
              onFocus={() => setShowResults(true)}
              onBlur={() => setShowResults(false)}
              onChange={(e) => handleSearchChange(e)}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div
                onMouseDown={() => setShowResults(true)}
                className={`${
                  showResults ? "block" : "hidden"
                } absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4`}
              >
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      <div key={index}>
                        <Link to={`/product/${Product_name}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={i.image_Url[0].url}
                              className="w-[40px] h-[40px] mr-[10px]"
                              alt="product"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* Categories */}
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                {" "}
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* nav-items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* icon */}
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                  onClick={() => setOpenWishList(true)}
                />
                <span className="absolute right-[-6px] top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                  onClick={() => setOpenCart(true)}
                />
                <span className="absolute right-[-6px] top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}/${user?.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/sign-in">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishList ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
