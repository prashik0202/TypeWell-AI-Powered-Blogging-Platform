import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // this gives user details
  // get this current user logged in
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // find the uset by id and email address
  const userdetails = await prisma.user.findUnique({
    where: {
      userId_email: {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    },
  });

  return Response.json(userdetails);
}
