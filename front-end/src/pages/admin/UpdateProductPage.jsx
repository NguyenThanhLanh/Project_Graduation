import React, { useEffect, useState } from "react";
import DashboardHeader from "../../component/admin/layout/DashboardHeader/DashboardHeader";
import DashboardSideBar from "../../component/admin/layout/DashboardSideBar/DashboardSideBar";
import UpdateProduct from "../../component/admin/UpdateProduct/UpdateProduct";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdateProductPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <UpdateProduct />
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
