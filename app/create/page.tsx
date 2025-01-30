"use client"; // This directive is required for Client Components

import { useActionState } from "react"; // New hook for managing Server Action state
import { useRouter } from "next/navigation"; // For programmatic navigation
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createPostAction } from "../actions/post"; // Import our Server Action
import { Editor } from "@/components/editor";
import { cn } from "@/lib/utils";

// Define the shape of our action's state (same as in the Server Action)
type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string;
  success?: boolean;
  postId?: string;
};

export default function CreatePost() {
  const router = useRouter();
  const [content, setContent] = useState("");

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
  // If the post was created successfully, it redirects to the new post
  useEffect(() => {
    if (state.success && state.postId) {
      router.push(`/post/${state.postId}`);
    }
  }, [state.success, state.postId, router]);

  const handleSubmit = async (formData: FormData) => {
    // Add the editor content to the form data
    formData.set("content", content);
    await formAction(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

      {/* The form now uses the formAction from useActionState */}
      <form action={handleSubmit} className="space-y-6">
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
          <Label>Content</Label>
          <Editor
            onChange={setContent}
            className={cn(
              "min-h-[500px] border-none",
              state.errors?.content && "border-red-500"
            )}
          />
          {/* Display content errors if any */}
          {state.errors?.content && (
            <p id="content-error" className="text-sm text-red-500">
              {state.errors.content.join(", ")}
            </p>
          )}
        </div>

        {/* Privacy toggle */}
        <div className="flex items-center space-x-2">
          <Switch id="isPrivate" name="isPrivate" />
          <Label htmlFor="isPrivate">Make this post private</Label>
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
