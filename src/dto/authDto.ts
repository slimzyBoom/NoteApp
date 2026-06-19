import z from "zod";

export const registerDto = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/\d/, "Must contain a number"),
})

export const loginDto = z.object({
  email: z.email("Invalid email address"),
  password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[a-z]/, "Must contain lowercase letter")
      .regex(/\d/, "Must contain a number"),
})
