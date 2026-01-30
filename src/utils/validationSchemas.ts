import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Todo Schema
export const todoSchema = z.object({
  title: z
    .string()
    .min(1, "Judul wajib diisi")
    .min(3, "Judul minimal 3 karakter")
    .max(100, "Judul maksimal 100 karakter"),
  dateTime: z
    .string()
    .refine(
      (date) => {
        if (!date) return false;
        return !isNaN(Date.parse(date));
      },
      { message: "Format tanggal tidak valid" },
    ),
});

export type TodoFormData = z.infer<typeof todoSchema>;

export const updateTodoSchema = todoSchema.extend({
  completed: z.boolean().optional(),
  subTodos: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        completed: z.boolean(),
      }),
    )
    .optional(),
});

export type TodoUpdateData = z.infer<typeof updateTodoSchema>;

export default {
  loginSchema,
  todoSchema,
  updateTodoSchema,
};