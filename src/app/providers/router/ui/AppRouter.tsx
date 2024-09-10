import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../config/routeConfig";
import { AppRoutesProps } from "@/shared/types/router";
import { RequireAuth } from "./RequireAuth";
import { MoonLoader } from "react-spinners";

export const AppRouter = () => {
  const renderWithWrapper = (route: AppRoutesProps) => {
    return (
      <Route
        key={route.path}
        element={
          route.authOnly ? (
            <RequireAuth>{route.element}</RequireAuth>
          ) : (
            route.element
          )
        }
        path={route.path}
      />
    );
  };

  return (
    <Suspense
      fallback={
        <div className="flex w-full justify-center items-center h-[100vh]">
          <MoonLoader color={"#36d7b7"} loading={true} size={70} />
        </div>
      }
    >
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};
export default AppRouter;
