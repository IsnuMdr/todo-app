export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export type TodoStatus = "pending" | "in_progress" | "completed";
export type TodoPriority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  token: string;
  user: Omit<User, "password">;
}
