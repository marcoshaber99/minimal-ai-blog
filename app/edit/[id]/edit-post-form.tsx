"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updatePostAction } from "../../actions/post";

type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string;
  success?: boolean;
};

type Post = {
  id: string;
  title: string;
  content: string;
  isPrivate: boolean;
};

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();

  const initialState: ActionState = {
    errors: {},
    message: "",
    success: false,
  };

  const [state, formAction, pending] = useActionState(
    updatePostAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push(`/post/${post.id}`);
    }
  }, [state.success, router, post.id]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit</h1>

      <form action={formAction} className="space-y-6 max-w-2xl">
        <input type="hidden" name="id" value={post.id} />

        {state.message && (
          <Alert variant={state.success ? "default" : "destructive"}>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={post.title}
            required
            aria-invalid={!!state.errors?.title}
            aria-describedby="title-error"
          />
          {state.errors?.title && (
            <p id="title-error" className="text-sm text-red-500">
              {state.errors.title.join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            defaultValue={post.content}
            required
            rows={10}
            aria-invalid={!!state.errors?.content}
            aria-describedby="content-error"
          />
          {state.errors?.content && (
            <p id="content-error" className="text-sm text-red-500">
              {state.errors.content.join(", ")}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isPrivate"
            name="isPrivate"
            defaultChecked={post.isPrivate}
          />
          <Label htmlFor="isPrivate">Make this post private</Label>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="font-semibold dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {pending ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </div>
  );
}
