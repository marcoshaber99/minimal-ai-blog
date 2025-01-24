"use client"; // This directive is required for Client Components

import { useActionState } from "react"; // New hook for managing Server Action state
import { useRouter } from "next/navigation"; // For programmatic navigation
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { createPostAction } from "../actions/post"; // Import our Server Action

// Define the shape of our action's state (same as in the Server Action)
type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string;
  success?: boolean;
};

export default function CreatePost() {
  const router = useRouter();

  // Initial state for our form
  const initialState: ActionState = {
    errors: {},
    message: "",
    success: false,
  };

  // useActionState is a new hook that manages the state of our Server Action
  // It returns:
  // - state: the current state of the action
  // - formAction: a function to be used as the form's action
  // - pending: a boolean indicating if the action is in progress
  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState
  );

  // This effect runs when the state changes
  // If the post was created successfully, it redirects to the home page
  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      {/* The form now uses the formAction from useActionState */}
      <form action={formAction} className="space-y-6 max-w-2xl">
        {/* Display success or error messages */}
        {state.message && (
          <Alert variant={state.success ? "default" : "destructive"}>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {/* Title input field */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            required
            aria-invalid={!!state.errors?.title}
            aria-describedby="title-error"
          />
          {/* Display title errors if any */}
          {state.errors?.title && (
            <p id="title-error" className="text-sm text-red-500">
              {state.errors.title.join(", ")}
            </p>
          )}
        </div>

        {/* Content textarea field */}
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            required
            rows={10}
            aria-invalid={!!state.errors?.content}
            aria-describedby="content-error"
          />
          {/* Display content errors if any */}
          {state.errors?.content && (
            <p id="content-error" className="text-sm text-red-500">
              {state.errors.content.join(", ")}
            </p>
          )}
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={pending}
          className="font-semibold dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {pending ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
