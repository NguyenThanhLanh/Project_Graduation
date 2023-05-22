import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { server } from "../../../../server";
import logoPage from "../../../../assets/image-static/logoPage/logo.png";

const DashboardHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img src={logoPage} alt="Logo admin" />
        </Link>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          {user.avatar && user.avatar ? (
            <Link to="/admin/dashboard">
              <img
                src={`${server}/${user.avatar}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;