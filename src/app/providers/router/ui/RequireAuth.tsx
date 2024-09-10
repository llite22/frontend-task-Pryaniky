import { getRouteLogin } from "@/shared/const/router";
import useToken from "@/shared/hooks/useToken/useToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";


export function RequireAuth({ children }: { children: ReactNode }) {
  const token = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to={getRouteLogin()} state={{ from: location }} replace />;
  }

  return children;
}
