"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deletePostAction } from "@/app/actions/post";

interface DeletePostButtonProps {
  postId: string;
  postTitle: string;
  redirectPath?: string;
}

export function DeletePostButton({
  postId,
  postTitle,
  redirectPath = "/dashboard",
}: DeletePostButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const initialState = {
    message: "",
    success: false,
  };

  const [state, formAction, pending] = useActionState(
    deletePostAction,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });

      if (state.success) {
        router.push(redirectPath);
      }
    }
  }, [state, router, toast, redirectPath]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="border border-transparent hover:bg-transparent hover:border-red-600 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete &quot;{postTitle}&quot;. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="id" value={postId} />
            <AlertDialogAction
              type="submit"
              disabled={pending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {pending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
