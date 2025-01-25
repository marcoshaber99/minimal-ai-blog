"use server"; // This directive marks all exports of this file as Server Actions

import { createPost } from "@/lib/db";
import { postSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Define the shape of our action's state
// This helps with type safety throughout our application
type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
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
  const { userId } = await auth();

  if (!userId) {
    return {
      message: "You must be signed in to create a post.",
      success: false,
    };
  }

  // The function returns a Promise of ActionState
  // Step 1: Validate the form data
  const validatedFields = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    isPrivate: formData.get("isPrivate") === "on", // Convert checkbox value to boolean
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
    // Create the post in the database with the author ID
    await createPost({
      ...validatedFields.data,
      authorId: userId,
    });

    // Revalidate the home page and user's posts page
    revalidatePath("/");
    revalidatePath("/posts");

    // Return success state
    return {
      success: true,
      message: "Post created successfully!",
    };
  } catch (error) {
    // Improved error handling
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Post creation error:", errorMessage);

    return {
      success: false,
      message: "Failed to create post. Please try again.",
      errors: {
        title: ["Database Error: Failed to create post."],
      },
    };
  }
}
