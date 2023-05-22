import React from "react";
import DashboardHeader from "../../component/admin/layout/DashboardHeader/DashboardHeader";
import DashboardSideBar from "../../component/admin/layout/DashboardSideBar/DashboardSideBar";
import AllEvent from "../../component/admin/AllEvent/AllEvent.jsx";

const AdminGetProductPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <AllEvent />
        </div>
      </div>
    </div>
  );
};

export default AdminGetProductPage;
