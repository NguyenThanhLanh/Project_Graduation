import React from "react";
import DashboardHeader from "../../component/admin/layout/DashboardHeader/DashboardHeader";
import DashboardSideBar from "../../component/admin/layout/DashboardSideBar/DashboardSideBar";
import AllSupplier from "../../component/admin/AllSupplier/AllSupplier.jsx";

const AdminGetAllSupplierPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <AllSupplier />
        </div>
      </div>
    </div>
  );
};

export default AdminGetAllSupplierPage;
