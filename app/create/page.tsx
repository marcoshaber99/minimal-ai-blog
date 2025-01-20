"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { createPostAction } from "../actions/post";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tag } from "@/components/tag";
import { useToast } from "@/hooks/use-toast";

type ActionState = {
  errors?: {
    title?: string[];
    content?: string[];
    tags?: string[];
  };
  message?: string;
  success?: boolean;
};

export default function CreatePost() {
  const router = useRouter();
  const { toast } = useToast();
  const initialState: ActionState = {
    errors: {},
    message: "",
    success: false,
  };

  const [state, formAction, pending] = useActionState(
    createPostAction,
    initialState
  );
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      tags.forEach((tag) => formData.append("tags", tag));
      await formAction(formData);

      toast({
        title: "Success!",
        description: "Your post has been created.",
        variant: "default",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <form action={handleSubmit} className="space-y-6 max-w-2xl">
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
          {state.errors?.content && (
            <p id="content-error" className="text-sm text-red-500">
              {state.errors.content.join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter a tag"
              aria-invalid={!!state.errors?.tags}
              aria-describedby="tags-error"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button type="button" onClick={handleAddTag}>
              Add Tag
            </Button>
          </div>
          {state.errors?.tags && (
            <p id="tags-error" className="text-sm text-red-500">
              {state.errors.tags.join(", ")}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} onRemove={() => handleRemoveTag(tag)} />
            ))}
          </div>
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </div>
  );
}
