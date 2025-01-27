import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPostsByAuthor } from "@/lib/db";
import { DashboardClient } from "@/components/dashboard-client";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const posts = await getPostsByAuthor(userId, userId);

  return <DashboardClient initialPosts={posts} />;
}
