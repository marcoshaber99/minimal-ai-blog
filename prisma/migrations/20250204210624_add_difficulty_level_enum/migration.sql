/*
  Warnings:

  - The `difficultyLevel` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('beginner', 'intermediate', 'advanced');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "difficultyLevel",
ADD COLUMN     "difficultyLevel" "DifficultyLevel" NOT NULL DEFAULT 'beginner';
