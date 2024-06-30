import prisma from "@/lib/prisma";
import { z } from "zod";

export async function GET(request: Request) {
  //fetching blog content based on id
  console.log("URL" + request.url);
  const { searchParams } = new URL(request.url);
  const paramType = searchParams.get("postId");

  const validtor = z.string();

  const queryParams = validtor.safeParse(paramType);
  if (!queryParams.success) {
    return Response.json(queryParams.error, { status: 400 });
  }

  const postId = queryParams.data;
  // console.log(postid);

  const post = await prisma.post.findUnique({
    where: {
      PostId: postId,
    },
  });

  return Response.json(post);
}
