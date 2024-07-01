import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const allUserPosts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  });

  return Response.json(allUserPosts);
}
