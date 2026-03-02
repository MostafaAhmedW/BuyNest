import React, { useContext } from "react";
import { authContext } from "./../Context/AuthContext";
import { Navigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import Loader from "../Loader/Loader";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useContext(authContext);

  if (loading) {
    return <Loader/>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
