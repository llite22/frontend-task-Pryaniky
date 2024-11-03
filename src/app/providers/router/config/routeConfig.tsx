import { AppRoutes, getRouteMain, getRouteLogin } from "@/shared/const/router";
import { LoginPage } from "@/pages/LoginPage";
import { AppRoutesProps } from "@/shared/types/router";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PublicRoute } from "../ui/PublicRoute";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.Login]: {
    path: getRouteLogin(),
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },

  [AppRoutes.Main]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true,
  },

  [AppRoutes.Not_Found]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
