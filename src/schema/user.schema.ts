import { basename } from "path";
import { z } from "zod";

const BaseUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters")
    .regex(/(?=.*[A-Z])/, "The password must contain at least 1 capital letter")
    .regex(
      /(?=.*[!@#$&*])/,
      "The password must contain at least 1 special character: !@#$&*"
    )
    .regex(/(?=.*[0-9])/, "The password must contain at least 1 number"),
  confirmPassword: z.string().min(1, "Confirm password"),
});

export const SignUpSchema = BaseUserSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords didn't match",
    path: ["confirmPassword"],
  }
);

export const LoginSchema = BaseUserSchema.pick({
  email: true,
  password: true,
});

export const UpdateSchema = BaseUserSchema.pick({
  email: true,
  name: true,
}).partial();
