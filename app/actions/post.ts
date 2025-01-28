"use server"; // This directive marks all exports of this file as Server Actions

import { createPost, updatePost, deletePost } from "@/lib/db";
import { postSchema } from "@/lib/validations";
import { revalidateTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Define the shape of our action's state
// This helps with type safety throughout our application
type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string;
  success?: boolean;
  postId?: string;
};

type UpdateActionState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string;
  success?: boolean;
};

type DeleteActionState = {
  message?: string;
  success?: boolean;
};

type FavoriteActionState = {
  success: boolean;
  message?: string;
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
    const post = await createPost({
      ...validatedFields.data,
      authorId: userId,
    });

    // Revalidate all relevant cache tags
    revalidateTag("posts");
    revalidateTag("author-posts");

    // Return success state
    return {
      success: true,
      message: "Post created successfully!",
      postId: post.id,
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

export async function updatePostAction(
  prevState: UpdateActionState,
  formData: FormData
): Promise<UpdateActionState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      message: "You must be signed in to update a post.",
      success: false,
    };
  }

  const postId = formData.get("id") as string;

  const validatedFields = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    isPrivate: formData.get("isPrivate") === "on",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update post. Please check the form for errors.",
    };
  }

  try {
    await updatePost(postId, {
      ...validatedFields.data,
      authorId: userId,
    });

    // Revalidate all relevant cache tags
    revalidateTag("posts");
    revalidateTag("post");
    revalidateTag("author-posts");

    return {
      success: true,
      message: "Post updated successfully!",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Post update error:", errorMessage);

    return {
      success: false,
      message: "Failed to update post. Please try again.",
      errors: {
        title: ["Database Error: Failed to update post."],
      },
    };
  }
}

export async function deletePostAction(
  prevState: DeleteActionState,
  formData: FormData
): Promise<DeleteActionState> {
  const { userId } = await auth();

  if (!userId) {
    return {
      message: "You must be signed in to delete a post.",
      success: false,
    };
  }

  const postId = formData.get("id") as string;

  try {
    await deletePost(postId, userId);

    // Revalidate all relevant cache tags
    revalidateTag("posts");
    revalidateTag("post");
    revalidateTag("author-posts");

    return {
      success: true,
      message: "Post deleted successfully!",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Post deletion error:", errorMessage);

    return {
      success: false,
      message: "Failed to delete post. Please try again.",
    };
  }
}

export async function toggleFavorite(
  postId: string
): Promise<FavoriteActionState> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to favorite posts.",
      };
    }

    // Check if user has already favorited this post
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingFavorite) {
      // Remove favorite
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          postId,
          userId,
        },
      });
    }

    // Revalidate cache
    revalidateTag("posts");
    revalidateTag("post");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return {
      success: false,
      message: "Failed to update favorite status.",
    };
  }
}
