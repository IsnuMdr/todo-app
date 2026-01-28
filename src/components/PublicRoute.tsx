import { ROUTES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  // redirect to main layout if user is already logged in
  const { user } = useAuth();
  if (user) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
