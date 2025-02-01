import { Suspense } from "react";
import { CreateSkeleton } from "@/components/skeleton-loader";
import { CreatePostForm } from "@/components/create-post-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function CreatePostPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <CreatePostForm />;
}

export default function CreatePage() {
  return (
    <Suspense fallback={<CreateSkeleton />}>
      <CreatePostPage />
    </Suspense>
  );
}
