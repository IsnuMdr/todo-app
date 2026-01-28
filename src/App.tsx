import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ROUTES } from "@constants";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { TodoProvider } from "./contexts/TodoContext";
import PublicRoute from "./components/PublicRoute";
import DashboardPage from "./pages/DashboardPage";
import TodosPage from "./pages/TodosPage";

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <TodoProvider>
            <Routes>
              {/* Public Routes */}
              <Route path={ROUTES.LOGIN} element={<PublicRoute />}>
                <Route index element={<LoginPage />} />
              </Route>

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to={ROUTES.DASHBOARD} replace />}
                />
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.TODOS} element={<TodosPage />} />
              </Route>

              {/* Catch all route */}
              <Route
                path="*"
                element={<Navigate to={ROUTES.LOGIN} replace />}
              />
            </Routes>
          </TodoProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
