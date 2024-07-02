"use server";
import prisma from "@/lib/prisma";
import { CreatePostSchema, CreatePostSchemaType } from "@/schema/post";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreatePost(form: CreatePostSchemaType) {
  // parse the body data to schema validator
  const parseBody = CreatePostSchema.safeParse(form);
  if (!parseBody.success) {
    throw new Error(parseBody.error.message);
  }
  // get user logged in
  const user = await currentUser();
  // if user not found then redirect to sign-in
  if (!user) {
    redirect("/sign-in");
  }
  // destructure the parsebody
  const { content, description, premium, title } = parseBody.data;
  // prisma to create or insert data to table

  const data = await prisma.post.create({
    data: {
      userId: user.id,
      content: content,
      description: description,
      premium: premium,
      title: title,
      userName: user?.fullName,
    },
  });

  redirect("/");
}
