/*
  Warnings:

  - A unique constraint covering the columns `[userId,title,PostId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_userId_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Post_userId_title_PostId_key" ON "Post"("userId", "title", "PostId");
