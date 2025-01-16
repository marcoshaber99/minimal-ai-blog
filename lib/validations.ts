import { z } from "zod";

// Define the shape and validation rules for a blog post
// This schema is used for both client and server-side validation

export const postSchema = z.object({
  // Title must exist and be between 3 and 255 characters
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255, "Title must be less than 255 characters long"),

  // Content must exist and be at least 10 characters long
  content: z.string().min(10, "Content must be at least 10 characters long"),
});
