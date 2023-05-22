import React from "react";
import DashboardHeader from "../../component/admin/layout/DashboardHeader/DashboardHeader";
import DashboardSideBar from "../../component/admin/layout/DashboardSideBar/DashboardSideBar";
import CreateEvent from "../../component/admin/CreateEvent/CreateEvent.jsx";

const AdminCreateEventPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default AdminCreateEventPage;
