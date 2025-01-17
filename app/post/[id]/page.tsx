import { getPost } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-8">{post.title}</h1>

      <p className="text-sm mb-8">
        Published on {new Date(post.createdAt).toLocaleDateString()}
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
