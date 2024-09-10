import { AppRoutes, getRouteMain, getRouteLogin } from "@/shared/const/router";
import { LoginPage } from "@/pages/LoginPage";
import { AppRoutesProps } from "@/shared/types/router";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.Login]: {
    path: getRouteLogin(),
    element: <LoginPage />,
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
