import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ProtectedRoute = ({ children }) => {
  const { persistentLogin } = useSelector((store) => store.user);
  if (persistentLogin === true) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
