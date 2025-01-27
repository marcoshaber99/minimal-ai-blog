import { getPost } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { getAuthorDisplayName } from "@/lib/utils/user";
import { ErrorMessage } from "@/components/error-message";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { userId } = await auth();
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id, userId);

  if (!post) {
    return (
      <div className="container max-w-2xl mx-auto mt-16">
        <ErrorMessage
          title="Post Not Available"
          message="This post either does not exist or is private."
        />
      </div>
    );
  }

  const authorName = getAuthorDisplayName(post.author);
  const isAuthor = userId === post.authorId;

  return (
    <article className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mt-8">{post.title}</h1>
        {isAuthor && (
          <Link href={`/edit/${post.id}`}>
            <Button variant="outline">Edit</Button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        {authorName && (
          <>
            <span>
              By{" "}
              <span className="font-medium text-foreground">{authorName}</span>
            </span>
            <span>•</span>
          </>
        )}
        <time dateTime={new Date(post.createdAt).toISOString()}>
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
        {post.isPrivate && (
          <>
            <span>•</span>
            <span className="font-semibold italic text-blue-500 dark:text-yellow-500">
              Private
            </span>
          </>
        )}
      </div>

      <div className="prose max-w-none dark:prose-invert">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
