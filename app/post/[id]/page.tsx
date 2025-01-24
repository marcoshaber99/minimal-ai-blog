import { getPost } from "@/lib/db";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

function getAuthorDisplayName(
  author: {
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    email?: string | null;
  } | null
) {
  if (!author) return null;

  if (author.firstName && author.lastName) {
    return `${author.firstName} ${author.lastName}`;
  }

  if (author.username) {
    return author.username;
  }

  if (author.email) {
    return author.email.split("@")[0]; // Show only the part before @ for privacy
  }

  return null;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  if (!post) {
    return notFound();
  }

  const authorName = getAuthorDisplayName(post.author);

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-8">{post.title}</h1>

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
