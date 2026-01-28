import TodoContext from "@/contexts/TodoContext";
import { useContext } from "react";

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos must be used within TodoProvider");
  }

  return context;
};
