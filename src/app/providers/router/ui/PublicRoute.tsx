import { getRouteMain } from "@/shared/const/router";
import useToken from "@/shared/hooks/useToken/useToken";
import { ReactNode } from "react";
import { Navigate } from "react-router";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const token = useToken();

  return !token ? children : <Navigate to={getRouteMain()} />;
};
