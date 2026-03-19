/**
 * ============================================================
 *   SERVERWALE — PrivateRoute Component
 *   Blocks unauthenticated access to all admin pages
 *   Redirects to /admin (login page) if not logged in
 * ============================================================
 */

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!isAdminAuthenticated()) {
    // Redirect to login page, remember where they were trying to go
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
