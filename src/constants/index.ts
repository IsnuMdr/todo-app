// Storage Keys
export const STORAGE_KEYS = {
  USER: "todo_app_user",
  TODOS: "todo_app_todos",
  AUTH_TOKEN: "todo_app_auth_token",
};

// Todo Status
export const TODO_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

// Todo Priority
export const TODO_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  TODOS: "/todos",
};

// Messages
export const MESSAGES = {
  LOGIN_SUCCESS: "Login berhasil!",
  LOGIN_ERROR: "Email atau password salah!",
  REGISTER_SUCCESS: "Registrasi berhasil! Silakan login.",
  REGISTER_ERROR: "Email sudah terdaftar!",
  TODO_CREATED: "Todo berhasil ditambahkan!",
  TODO_UPDATED: "Todo berhasil diupdate!",
  TODO_DELETED: "Todo berhasil dihapus!",
  LOGOUT_SUCCESS: "Logout berhasil!",
};
