"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createPostAction } from "@/app/actions/post";
import { Editor } from "@/components/editor";
import { cn } from "@/lib/utils";
import { LearningOutcomes } from "@/components/learning-outcomes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
    learningOutcomes?: string[];
  };
  message?: string;
  success?: boolean;
  postId?: string;
};

export function CreatePostForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([""]);

  const initialState: ActionState = {
    errors: {},
    message: "",
    success: false,
  };

  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState
  );

  useEffect(() => {
    if (state.success && state.postId) {
      router.push(`/post/${state.postId}`);
    }
  }, [state.success, state.postId, router]);

  const handleSubmit = async (formData: FormData) => {
    formData.set("content", content);
    formData.set(
      "learningOutcomes",
      JSON.stringify(learningOutcomes.filter(Boolean))
    );
    await formAction(formData);
  };

  return (
    <Card className="max-w-4xl mx-auto dark:bg-[#0f0f18]/40 border-none">
      <CardHeader>
        <CardTitle className="text-3xl">Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-6">
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

          <LearningOutcomes
            outcomes={learningOutcomes}
            setOutcomes={setLearningOutcomes}
            error={state.errors?.learningOutcomes?.join(", ")}
          />

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              onChange={setContent}
              className={cn(
                "min-h-[300px] border-none",
                state.errors?.content && "border-red-500"
              )}
            />
            {state.errors?.content && (
              <p id="content-error" className="text-sm text-red-500">
                {state.errors.content.join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="isPrivate" name="isPrivate" />
              <Label htmlFor="isPrivate">Make this post private</Label>
            </div>
            <Button type="submit" disabled={pending} className="font-semibold">
              {pending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
