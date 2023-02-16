import { Navigate } from 'react-router-dom'

export type PublicRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

export const PublicRoute = ({ isAuthenticated, authenticationPath, outlet }: PublicRouteProps) => {
  return isAuthenticated
    ? <Navigate to={ authenticationPath } replace />
    : outlet
};