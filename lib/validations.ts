import { z } from "zod";

// Define the allowed difficulty levels
export const DifficultyLevel = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

// Create a type from the difficulty levels object
export type DifficultyLevel =
  (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

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

  // Whether the post is private or public
  isPrivate: z.boolean().default(false),

  // Learning outcomes must be an array of strings and at least one is required
  learningOutcomes: z
    .array(z.string())
    .min(1, "At least one learning outcome is required"),

  // Difficulty level must be one of the defined levels
  difficultyLevel: z.enum(
    [
      DifficultyLevel.BEGINNER,
      DifficultyLevel.INTERMEDIATE,
      DifficultyLevel.ADVANCED,
    ],
    {
      required_error: "Please select a difficulty level",
      invalid_type_error:
        "Difficulty level must be either beginner, intermediate, or advanced",
    }
  ),
});
