import prisma from "@/lib/prisma";

// get All Post
export async function GET(request: Request) {
  const allPosts = await getAllPost();
  return Response.json(allPosts);
}

export type getAllPostResponseType = Awaited<ReturnType<typeof getAllPost>>;

async function getAllPost() {
  return prisma.post.findMany();
}
