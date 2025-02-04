"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updatePostAction } from "@/app/actions/post";
import { Editor } from "@/components/editor";
import { cn } from "@/lib/utils";
import { LearningOutcomes } from "@/components/learning-outcomes";
import { DifficultySelect } from "@/components/difficulty-select";
import type { DifficultyLevel } from "@/lib/validations";

type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
    learningOutcomes?: string[];
    difficultyLevel?: string[];
  };
  message?: string;
  success?: boolean;
};

type Post = {
  id: string;
  title: string;
  content: string;
  isPrivate: boolean;
  learningOutcomes: string[];
  difficultyLevel: DifficultyLevel;
};

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const [content, setContent] = useState(post.content);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>(
    post.learningOutcomes.length > 0 ? post.learningOutcomes : [""]
  );

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

  const handleSubmit = async (formData: FormData) => {
    // Add the editor content and learning outcomes to the form data
    formData.set("content", content);
    formData.set(
      "learningOutcomes",
      JSON.stringify(learningOutcomes.filter(Boolean))
    );
    await formAction(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

      <form action={handleSubmit} className="space-y-6">
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

        <DifficultySelect
          defaultValue={post.difficultyLevel}
          error={state.errors?.difficultyLevel?.join(", ")}
        />

        <LearningOutcomes
          outcomes={learningOutcomes}
          setOutcomes={setLearningOutcomes}
          error={state.errors?.learningOutcomes?.join(", ")}
        />

        <div className="space-y-2">
          <Label>Content</Label>
          <Editor
            content={post.content}
            onChange={setContent}
            className={cn(
              "min-h-[500px] border-none",
              state.errors?.content && "border-red-500"
            )}
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

        <Button type="submit" disabled={pending} className="font-semibold">
          {pending ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </div>
  );
}
