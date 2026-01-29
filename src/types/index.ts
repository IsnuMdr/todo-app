export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface SubTodo {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  dateTime: string;
  completed: boolean;
  subTodos?: SubTodo[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  token: string;
  user: Omit<User, "password">;
}
