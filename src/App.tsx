import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@constants";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import PublicRoute from "./components/PublicRoute";
import DashboardPage from "./pages/DashboardPage";
import TodosPage from "./pages/TodosPage";
import { ToastProvider } from "./contexts/ToastContext";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
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
                  <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
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
    </BrowserRouter>
  );
}

export default App;
