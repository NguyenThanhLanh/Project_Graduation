import React from "react";
import DashboardHeader from "../../component/admin/layout/DashboardHeader/DashboardHeader";
import DashboardSideBar from "../../component/admin/layout/DashboardSideBar/DashboardSideBar";
import UpdateEvent from "../../component/admin/UpdateEvent/UpdateEvent.jsx";

const UpdateEventPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <UpdateEvent />
        </div>
      </div>
    </div>
  );
};

export default UpdateEventPage;
