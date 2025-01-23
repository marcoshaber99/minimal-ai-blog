import { getPost } from "@/lib/db";
import { notFound } from "next/navigation";

// Define the props type, making params a promise
type PostPageProps = {
  params: { id: string };
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.id);

  if (!post) {
    return notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-8">{post.title}</h1>

      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        {post.author && (
          <span>
            By{" "}
            <span className="font-medium text-foreground">
              {post.author.firstName} {post.author.lastName}
            </span>
          </span>
        )}
        <span>•</span>
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
