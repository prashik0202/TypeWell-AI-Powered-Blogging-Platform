"use client";
import Image from "next/image";
import bghome from "../../public/home-bg.jpg";
import { demoContent } from "@/constants";
import BlogCard from "@/components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPostResponseType } from "../api/post/route";
import SkletonWrapper from "@/components/SkletonWrapper";

export default function Home() {
  const allPosts = useQuery<getAllPostResponseType>({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch("/api/post");
      return await res.json();
    },
  });

  const postAvilable = allPosts.data;

  return (
    <main className="flex flex-col  justify-between container my-32">
      <div className="w-full flex items-center justify-center text-center">
        {/* <Image src={bghome} alt="bg" className="w-full h-[350px] md:h-[650px] object-cover"/> */}
        <div className="p-5 md:p-20">
          <h1 className=" text-4xl md:text-9xl  font-semibold bg-gradient-to-r from-sky-400 to-green-500 bg-clip-text text-transparent">
            Typewell
          </h1>
          <h1 className="text-2xl md:text-6xl  mt-4 font-semibold bg-gradient-to-r from-sky-400 to-green-500 bg-clip-text text-transparent">
            an{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text text-transparent">
              AI powered
            </span>{" "}
            Blog Application
          </h1>
          <p className="text-sm md:text-base  mt-5 text-muted-foreground">
            Where writer can get suggestion or even generate some part of blog
            with help of AI
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-3xl underline underline-offset-4">
          Trending Blogs
        </h1>
        <div className="mt-5 grid grid-col-1 md:grid-cols-2 gap-4">
          {postAvilable?.length === 0 && (
            <div>
              <h1 className="text-center text-3xl text-slate-300">
                No posts yet!😊
              </h1>
              <p>Naviagate to create page to create your own first post</p>
            </div>
          )}
          {postAvilable &&
            postAvilable.map((item) => (
              <BlogCard
                key={item.title}
                title={item.title}
                description={item.description}
                created_date={item.createdAt}
                author_name={item.userName}
                premium={item.premium}
                postId={item.PostId}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
