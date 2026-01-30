import { useState } from "react";
import { formatDate } from "@/utils";
import { Check, Edit2, EllipsisVertical, Plus, Trash } from "lucide-react";
import type { Todo } from "@/types";

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onCreateSubTodo: (parentId: string) => void;
  onToggleSubTodoComplete: (todoId: string, subTodoId: string) => void;
  onDeleteSubTodo: (todoId: string, subTodoId: string) => void;
}

const TodoCard = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  onCreateSubTodo,
  onToggleSubTodoComplete,
  onDeleteSubTodo,
}: TodoCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const isOverdue = (dateTimeString: string) => {
    return new Date(dateTimeString) < new Date() && !todo.completed;
  };

  return (
    <div
      className={`
        bg-white border rounded-xl p-2 shadow-sm
        transition-all duration-200
        hover:shadow-md
        ${todo.completed ? "border-green-200 bg-green-50/30" : "border-gray-200"}
      `}
    >
      {/* Main Todo */}
      <div className="flex items-start gap-3 px-2.5 py-1.5">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`
            flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2
            transition-all duration-200
            ${
              todo.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 hover:border-green-500"
            }
          `}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <h3
              className={`
                text-sm font-medium
                ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}
              `}
            >
              {todo.title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span
                  className={
                    isOverdue(todo.dateTime) ? "text-red-600 font-medium" : ""
                  }
                >
                  {isOverdue(todo.dateTime) && "Overdue - "}
                  {formatDate(todo.dateTime)}
                </span>
              </div>

              {/* Action */}
              <div className="relative">
                <button
                  onClick={() => setShowActions((prev) => !prev)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Show actions"
                >
                  <EllipsisVertical className="w-5 h-5 text-gray-500" />
                </button>
                {showActions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        setShowActions(false);
                        onCreateSubTodo(todo.id);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#154886] hover:bg-[#154886]/5"
                    >
                      <Plus className="w-4 h-4" /> Add Subtask
                    </button>
                    <button
                      onClick={() => {
                        setShowActions(false);
                        onEdit(todo);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowActions(false);
                        onDelete(todo.id);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub Todos */}
          {todo.subTodos && todo.subTodos.length > 0 && (
            <div className="space-y-2 -ml-2 -pl-2 mt-2">
              {todo.subTodos.map((subTodo) => (
                <div
                  key={subTodo.id}
                  className="flex items-center gap-2 group p-2 border border-gray-200 rounded-lg"
                >
                  {/* Sub Todo Checkbox */}
                  <button
                    onClick={() => onToggleSubTodoComplete(todo.id, subTodo.id)}
                    className={`
                          flex-shrink-0 w-4 h-4 rounded border-2
                          transition-all duration-200
                          ${
                            subTodo.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 hover:border-green-500"
                          }
                        `}
                  >
                    {subTodo.completed && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>

                  {/* Sub Todo Title */}
                  <span
                    className={`
                          flex-1 text-sm
                          ${
                            subTodo.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-700"
                          }
                        `}
                  >
                    {subTodo.title}
                  </span>

                  {/* Sub Todo Delete */}
                  <button
                    onClick={() => onDeleteSubTodo(todo.id, subTodo.id)}
                    className="
                          p-1 hover:bg-red-50 rounded
                          transition-all duration-200
                        "
                    aria-label="Delete subtask"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
