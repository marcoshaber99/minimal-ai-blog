"use server"; // This directive marks all exports of this file as Server Actions

import { createPost } from "@/lib/db";
import { postSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

// Define the shape of our action's state
// This helps with type safety throughout our application
type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
    tags?: string[];
  };
  message?: string;
  success?: boolean;
};

// This is our Server Action
// It's an async function that handles form submission and data processing on the server
export async function createPostAction(
  prevState: ActionState, // The previous state, useful for updating only changed fields
  formData: FormData // The form data submitted by the user
): Promise<ActionState> {
  // The function returns a Promise of ActionState
  // Step 1: Validate the form data
  const validatedFields = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    tags: formData.getAll("tags"), // Get all tags from form data
  });

  // Step 2: If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post. Please check the form for errors.",
    };
  }

  // Step 3: If validation succeeds, try to create the post
  try {
    // Create the post in the database
    await createPost(validatedFields.data);

    // Revalidate the home page to show the new post immediately
    revalidatePath("/");

    // Return success state
    return {
      success: true,
      message: "Post created successfully!",
    };
  } catch (error) {
    // Step 4: If there's an error creating the post, return an error state
    console.error(error);
    return {
      errors: {
        title: ["Database Error: Failed to create post."],
      },
      message: "Database Error: Failed to create post.",
    };
  }
}
