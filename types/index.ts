import { DifficultyLevel } from "@/lib/validations";

export interface Post {
  id: string;
  title: string;
  content: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string | null;
  author?: User;
  isFavorited?: boolean;
  favoritesCount: number;
  learningOutcomes: string[];
  difficultyLevel: DifficultyLevel;
}

export interface User {
  id: string;
  email?: string | null;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
}

export type PostWithoutDates = Omit<Post, "createdAt" | "updatedAt">;

export type CreatePostInput = Omit<Post, "id" | "createdAt" | "updatedAt">;

export type UpdatePostInput = Partial<CreatePostInput> & { id: string };
