import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@constants";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import PublicRoute from "./components/PublicRoute";
import TodosPage from "./pages/TodosPage";
import { ToastProvider } from "./contexts/ToastContext";
import DashboardLayout from "./layouts/DashboardLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  "808034538162-nubsf22bljihm2pidrj4f9gpvbsggheg.apps.googleusercontent.com";

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <TodoProvider>
            <ToastProvider>
              <Routes>
                {/* Public Routes */}
                <Route path={ROUTES.LOGIN} element={<PublicRoute />}>
                  <Route index element={<LoginPage />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<DashboardLayout />}>
                    <Route path={ROUTES.TODOS} element={<TodosPage />} />
                  </Route>
                </Route>

                {/* Catch all route */}
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.LOGIN} replace />}
                />
              </Routes>
            </ToastProvider>
          </TodoProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
