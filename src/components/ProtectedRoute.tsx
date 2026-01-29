import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@constants";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin inline-block"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
