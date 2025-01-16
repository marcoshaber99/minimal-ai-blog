import { prisma } from "./prisma";

// Database Operations

// Fetch all posts, sorted by newest first
export async function getPosts() {
  return await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// Find a single post by its ID
// Returns null if post doesn't exist
export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

// Create a new post in the database
// Automatically generates ID and timestamps
export async function createPost(data: { title: string; content: string }) {
  return await prisma.post.create({
    data,
  });
}
