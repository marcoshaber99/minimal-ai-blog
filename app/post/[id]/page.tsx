import { getPost } from "@/lib/db";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  // Await the params object before accessing its properties
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-8">{post.title}</h1>

      <p className="text-sm mb-8">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="prose max-w-none">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
