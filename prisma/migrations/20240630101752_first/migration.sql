-- CreateTable
CREATE TABLE "Post" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "PostId" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_userId_title_key" ON "Post"("userId", "title");
