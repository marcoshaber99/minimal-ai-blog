import { getPost } from "@/lib/db";
import { notFound } from "next/navigation";
import { Tag } from "@/components/tag";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-8">{post.title}</h1>

      <p className="text-sm mb-4">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <p className=" font-semibold mb-2">Tags:</p>
            {post.tags.map((tag) => (
              <Tag key={tag.id} name={tag.name} href={`/tag/${tag.name}`} />
            ))}
          </div>
        </div>
      )}

      <div className="prose max-w-none mt-8">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
