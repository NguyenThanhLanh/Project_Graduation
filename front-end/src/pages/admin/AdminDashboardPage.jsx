import React from "react";
import DashboardHeader from "../../component/admin/layout/DashboardHeader/DashboardHeader.jsx";
import DashboardSideBar from "../../component/admin/layout/DashboardSideBar/DashboardSideBar.jsx";

const AdminDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        {/* <DashboardHero /> */}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
