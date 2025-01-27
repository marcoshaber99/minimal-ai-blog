import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

// Fetch all public posts, sorted by newest first
export const getPosts = unstable_cache(
  async () => {
    return await prisma.post.findMany({
      where: { isPrivate: false },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });
  },
  ["posts"],
  { revalidate: 10 } // Revalidate every 10 seconds
);

// Find a single post by its ID, respecting privacy settings
export const getPost = unstable_cache(
  async (id: string, currentUserId?: string | null) => {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    // If post doesn't exist, return null
    if (!post) return null;

    // If post is public, return it
    if (!post.isPrivate) return post;

    // If post is private, only return if the current user is the author
    if (currentUserId && post.authorId === currentUserId) return post;

    // Otherwise, return null
    return null;
  },
  ["post"],
  { revalidate: 10 }
);

// Get posts by author ID, including private posts if the viewer is the author
export const getPostsByAuthor = unstable_cache(
  async (authorId: string, currentUserId?: string | null) => {
    return await prisma.post.findMany({
      where: {
        authorId,
        // Only include private posts if the viewer is the author
        OR: [
          { isPrivate: false },
          { isPrivate: true, authorId: currentUserId },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });
  },
  ["posts-by-author"],
  { revalidate: 10 }
);

// Create a new post in the database
export async function createPost(data: {
  title: string;
  content: string;
  authorId: string;
  isPrivate: boolean;
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

export async function updatePost(
  id: string,
  data: {
    title: string;
    content: string;
    authorId: string;
    isPrivate: boolean;
  }
) {
  return await prisma.post.update({
    where: { id },
    data,
    include: {
      author: true,
    },
  });
}

export async function deletePost(id: string, userId: string) {
  // First verify the post belongs to the user
  const post = await prisma.post.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!post || post.authorId !== userId) {
    throw new Error("Unauthorized or post not found");
  }

  return await prisma.post.delete({
    where: { id },
  });
}
