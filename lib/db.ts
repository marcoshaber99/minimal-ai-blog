import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";
import type { Post, User } from "@/types";
import { DifficultyLevel } from "@prisma/client";

// Fetch all public posts, sorted by newest first
export const getPosts = unstable_cache(
  async (currentUserId?: string | null) => {
    const posts = await prisma.post.findMany({
      where: { isPrivate: false },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        favorites: true,
      },
    });

    return posts.map((post) => ({
      ...post,
      isFavorited: currentUserId
        ? post.favorites.some((fav) => fav.userId === currentUserId)
        : false,
      favoritesCount: post.favorites.length,
    }));
  },
  ["posts"],
  {
    revalidate: 30, // Revalidate every 30 seconds
    tags: ["posts"], // Add tags for manual revalidation
  }
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
  {
    revalidate: 15, // Revalidate every 15 seconds for individual posts
    tags: ["post"], // Add tags for manual revalidation
  }
);

// Get posts by author ID, including private posts if the viewer is the author

export async function getPostsByAuthor(userId: string, viewerId: string) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      OR: [{ isPrivate: false }, { authorId: viewerId }],
    },
    include: {
      favorites: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts.map((post) => ({
    ...post,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    isFavorited: post.favorites.some((fav) => fav.userId === viewerId),
    favoritesCount: post.favorites.length,
    learningOutcomes: post.learningOutcomes,
    difficultyLevel: post.difficultyLevel,
    author: post.author
      ? {
          id: post.author.id,
          email: post.author.email,
          username: post.author.username,
          firstName: post.author.firstName,
          lastName: post.author.lastName,
          imageUrl: post.author.imageUrl,
        }
      : undefined,
  })) as Post[];
}

// Create a new post in the database
export async function createPost(data: {
  title: string;
  content: string;
  authorId: string;
  isPrivate: boolean;
  learningOutcomes: string[];
  difficultyLevel: DifficultyLevel;
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
    learningOutcomes: string[];
    difficultyLevel: DifficultyLevel;
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

export async function getPostWithFavorites(
  id: string,
  currentUserId?: string | null
): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      favorites: true,
    },
  });

  if (!post) return null;

  // If post is private and user is not the author, return null
  if (post.isPrivate && (!currentUserId || post.authorId !== currentUserId)) {
    return null;
  }

  const author: User | undefined = post.author
    ? {
        id: post.author.id,
        email: post.author.email,
        username: post.author.username,
        firstName: post.author.firstName,
        lastName: post.author.lastName,
        imageUrl: post.author.imageUrl,
      }
    : undefined;

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    isPrivate: post.isPrivate,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    authorId: post.authorId,
    author,
    isFavorited: currentUserId
      ? post.favorites.some((fav) => fav.userId === currentUserId)
      : false,
    favoritesCount: post.favorites.length,
    learningOutcomes: post.learningOutcomes,
    difficultyLevel: post.difficultyLevel,
  };
}
export async function getUserFavorites(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      post: {
        include: {
          author: true,
          favorites: {
            where: {
              userId,
            },
          },
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Filter out any favorites where the post might have been deleted
  // and map to return just the posts with favorite info
  return favorites
    .filter((fav) => fav.post !== null)
    .map((fav) => ({
      ...fav.post,
      isFavorited: true,
      favoritesCount: fav.post._count.favorites,
    })) as Post[];
}
