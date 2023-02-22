import { Routes, Route, Navigate } from "react-router-dom";
import Login from "components/Auth/Login";
import Register from "components/Auth/Register";
import MainScreen from "components/MainScreen/MainScreen";
import { PublicRouteProps, PublicRoute } from "./router/PublicRoute";
import { ProtectedRouteProps, ProtectedRoute } from "./router/ProtectedRoute";
import { routesPath } from "./router/routesPath";
import { GetCurrentUser } from "./redux/refreshToken";
import { useAuth } from "redux/useAuth";

const App = () => {
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
      <Route path={routesPath.app} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MainScreen />} />} />

      <Route path={routesPath.login} element={<PublicRoute {...defaultPublicRouteProps} outlet={<Login />} />} />
      <Route path={routesPath.register} element={<PublicRoute {...defaultPublicRouteProps} outlet={<Register />} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
