import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

// Fetch all posts, sorted by newest first
export const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { tags: true },
    });
  },
  ["posts"],
  { revalidate: 60 } // Revalidate every 60 seconds
);

// Find a single post by its ID
export const getPost = unstable_cache(
  async (id: string) => {
    return await prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });
  },
  ["post"],
  { revalidate: 60 }
);

// Create a new post in the database
export async function createPost(data: {
  title: string;
  content: string;
  tags?: string[];
}) {
  const { tags, ...postData } = data;
  return await prisma.post.create({
    data: {
      ...postData,
      tags: {
        connectOrCreate:
          tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })) || [],
      },
    },
    include: { tags: true },
  });
}

// Add a function to get all tags
export async function getAllTags() {
  return await prisma.tag.findMany();
}
