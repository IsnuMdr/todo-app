import React, { useState, useEffect, createContext } from "react";
import { TodoService } from "@/services";
import type { Todo } from "@/types";
import type { TodoFormData, TodoUpdateData } from "@/utils/validationSchemas";
import { useAuth } from "@/hooks/useAuth";

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  loadTodos: () => void;
  createTodo: (todoData: TodoFormData) => Todo;
  updateTodo: (id: string, todoData: TodoUpdateData) => Todo | null;
  deleteTodo: (id: string) => boolean;
  toggleTodoStatus: (id: string) => Todo | null;
  getTodoById: (id: string) => Todo | null;
  getTodosStats: () => ReturnType<typeof TodoService.getTodosStats>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userTodos = TodoService.getTodos();
      setTodos(userTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const loadTodos = () => {
    if (!user) {
      setTodos([]);
      return;
    }

    setLoading(true);
    try {
      const userTodos = TodoService.getTodos();
      setTodos(userTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = (todoData: TodoFormData) => {
    try {
      const newTodo = TodoService.createTodo(todoData);
      setTodos((prev) => [newTodo, ...prev]);
      return newTodo;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  };

  const updateTodo = (id: string, todoData: TodoUpdateData) => {
    try {
      const updatedTodo = TodoService.updateTodo(id, todoData);
      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      }
      return updatedTodo;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  };

  const deleteTodo = (id: string) => {
    try {
      const success = TodoService.deleteTodo(id);
      if (success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
      return success;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  };

  const toggleTodoStatus = (id: string) => {
    try {
      const updatedTodo = TodoService.toggleTodoStatus(id);
      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      }
      return updatedTodo;
    } catch (error) {
      console.error("Error toggling todo status:", error);
      throw error;
    }
  };

  const getTodoById = (id: string) => {
    return todos.find((todo) => todo.id === id) || null;
  };

  const getTodosStats = () => {
    return TodoService.getTodosStats();
  };

  const value = {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoStatus,
    getTodoById,
    getTodosStats,
    loadTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;
