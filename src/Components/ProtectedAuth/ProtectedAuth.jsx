import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  const { isLoggedIn } = useContext(authContext);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
