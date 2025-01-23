import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

// Fetch all posts, sorted by newest first
export const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
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
      include: {
        author: true,
      },
    });
  },
  ["post"],
  { revalidate: 60 }
);

// Get posts by author ID
export const getPostsByAuthor = unstable_cache(
  async (authorId: string) => {
    return await prisma.post.findMany({
      where: { authorId },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });
  },
  ["posts-by-author"],
  { revalidate: 60 }
);

// Create a new post in the database
export async function createPost(data: {
  title: string;
  content: string;
  authorId: string;
}) {
  return await prisma.post.create({
    data,
    include: {
      author: true,
    },
  });
}

// User-related functions
export async function createUser(data: {
  id: string;
  email?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}) {
  return await prisma.user.create({
    data,
  });
}

export async function updateUser(
  id: string,
  data: {
    email?: string | null;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
  }
) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}

export async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}
