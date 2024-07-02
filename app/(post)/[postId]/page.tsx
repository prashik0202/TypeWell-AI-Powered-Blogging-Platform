"use client";
import { Post } from "@prisma/client";
// import { getPostResponseType } from "@/app/api/postById/route";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import ReactMarkdown from "react-markdown";
import { StarIcon } from "lucide-react";

const BlogDetailPage = ({ params }: { params: { postId: string } }) => {
  const postId = params.postId;

  const Post = useQuery<Post>({
    queryKey: ["postbyId", postId],
    queryFn: async () => {
      const res = await fetch(`/api/postById?postId=${postId}`);
      return await res.json();
    },
  });

  const postAvilable = Post.data;
  // setPost(postAvilable);
  console.log(postAvilable);

  function convertMarkdownToHtml(content: string | undefined): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <section className="md:px-32">
      <div className="flex items-center  justify-between space-x-2">
        <h1 className="text-4xl text-purple-500 ">{postAvilable?.title}</h1>
        {postAvilable?.premium ? (
          <StarIcon className="text-yellow-400" />
        ) : undefined}
      </div>
      <h1 className="mt-2 text-l text-muted-foreground">
        By {postAvilable?.userName}
      </h1>
      <p>Posted On: {dayjs(postAvilable?.createdAt).format("MMM DD, YYYY")}</p>
      <ReactMarkdown
        // rehypePlugins={[remarkGfm, rehypeRaw]}
        className={"text-justify whitespace-pre-wrap my-10 "}
      >
        {postAvilable?.content}
      </ReactMarkdown>

      {/* <div className="whitespace-pre-wrap">{postAvilable?.content}</div> */}
    </section>
  );
};

export default BlogDetailPage;
