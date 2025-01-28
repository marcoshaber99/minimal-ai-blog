import { auth } from "@clerk/nextjs/server";
import { getPost } from "@/lib/db";
import { redirect } from "next/navigation";
import EditPostForm from "./edit-post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId, redirectToSignIn } = await auth();
  const resolvedParams = await params;

  if (!userId) {
    redirectToSignIn();
  }

  const post = await getPost(resolvedParams.id, userId);

  if (!post || post.authorId !== userId) {
    redirect("/");
  }

  return <EditPostForm post={post} />;
}
