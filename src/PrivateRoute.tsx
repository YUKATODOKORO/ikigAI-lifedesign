import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isLineLoggedIn = localStorage.getItem("isLineLoggedIn") === "true";

  if (!isLineLoggedIn) {
    return <Navigate to="/line-login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
