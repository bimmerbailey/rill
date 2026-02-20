import { z } from "zod";

// Email regex pattern from legacy frontend
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

// Initials pattern from legacy frontend (2-3 characters)
const initialsRegex = /^[a-zA-Z]{2,3}$/i;

export const userInfoSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),

  initials: z
    .string()
    .min(1, "Initials are required")
    .regex(initialsRegex, "Initials must be 2-3 letters"),

  email: z
    .string()
    .min(1, "Email is required")
    .regex(emailRegex, "Please enter a valid email address"),

  bio: z.string().max(500, "Bio must be less than 500 characters"),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
