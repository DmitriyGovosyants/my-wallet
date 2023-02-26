import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicRouteProps, PublicRoute } from "./router/PublicRoute";
import { ProtectedRouteProps, ProtectedRoute } from "./router/ProtectedRoute";
import { routesPath } from "./router/routesPath";
import { GetCurrentUser } from "./redux/auth/refreshToken";
import { useAuth } from "redux/auth/useAuth";
import { Login, Register, AppScreen } from "components";

const App: FC = () => {
  GetCurrentUser();
  const { isAuthorized } = useAuth();

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: isAuthorized,
    authenticationPath: '/login',
  };

  const defaultPublicRouteProps: Omit<PublicRouteProps, 'outlet'> = {
    isAuthenticated: isAuthorized,
    authenticationPath: '/',
  };

  return (
    <Routes>
      <Route path={routesPath.app} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<AppScreen />} />} />

      <Route path={routesPath.login} element={<PublicRoute {...defaultPublicRouteProps} outlet={<Login />} />} />
      <Route path={routesPath.register} element={<PublicRoute {...defaultPublicRouteProps} outlet={<Register />} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
