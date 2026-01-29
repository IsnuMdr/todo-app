import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "./ui";
import TodoContext from "@/contexts/TodoContext";
import { todoSchema } from "@/utils/validationSchemas";
import type { TodoFormData } from "@/utils/validationSchemas";

interface TodoFormProps {
  initialData?: TodoFormData;
  onSubmit?: (data: TodoFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const TodoForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: TodoFormProps) => {
  const { createTodo } = useContext(TodoContext)!;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: rhfSubmitting },
    reset,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: initialData || { title: "", dateTime: "" },
  });

  const submitHandler = async (data: TodoFormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      createTodo(data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Input
        label="Title"
        type="text"
        placeholder="Enter todo title"
        autoFocus
        {...register("title")}
        error={errors.title?.message}
      />

      <Input
        label="Date & Time"
        type="datetime-local"
        {...register("dateTime")}
        error={errors.dateTime?.message}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting || rhfSubmitting}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting || rhfSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
