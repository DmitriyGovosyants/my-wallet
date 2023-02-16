import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./component/Auth/Login";
import { Register } from "./component/Auth/Register";
import { PublicRouteProps, PublicRoute } from "./router/PublicRoute";
import { ProtectedRouteProps, ProtectedRoute } from "./router/ProtectedRoute";
import { routesPath } from "./router/routesPath";

const bool = false;

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
  isAuthenticated: bool,
  authenticationPath: '/login',
};

const defaultPublicRouteProps: Omit<PublicRouteProps, 'outlet'> = {
  isAuthenticated: bool,
  authenticationPath: '/',
};

const App = () => {
  return (
    <Routes>
      <Route path={routesPath.app} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<div>MAIN APP</div>} />} />

      <Route path={routesPath.login} element={<PublicRoute {...defaultPublicRouteProps} outlet={<Login />} />} />
      <Route path={routesPath.register} element={<PublicRoute {...defaultPublicRouteProps} outlet={<Register />} />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
