import { auth } from "@clerk/nextjs/server";
import { getPost } from "@/lib/db";
import { redirect } from "next/navigation";
import EditPostForm from "../../../../components/edit-post-form";
import { Suspense } from "react";
import { EditSkeleton } from "@/components/skeleton-loader";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

async function EditPostContent({ params }: EditPostPageProps) {
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

export default function EditPostPage(props: EditPostPageProps) {
  return (
    <Suspense fallback={<EditSkeleton />}>
      <EditPostContent params={props.params} />
    </Suspense>
  );
}
