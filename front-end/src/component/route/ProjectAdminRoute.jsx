import React from "react";
import { Navigate } from "react-router-dom";

const ProjectAdminRoute = ({ isAuthenticated, user, children }) => {
  // console.log({ isAuthenticated });
  if (isAuthenticated && user.roleId.name === "admin") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProjectAdminRoute;
