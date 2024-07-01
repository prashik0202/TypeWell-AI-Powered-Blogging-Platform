"use client";
import { getAllPostResponseType } from "@/app/api/post/route";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pencil, Trash } from "lucide-react";
import React from "react";

const UserPosts = () => {
  const allPosts = useQuery<getAllPostResponseType>({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch("/api/userPost");
      return await res.json();
    },
  });

  const postAvilable = allPosts.data;

  return (
    <div className="flex-col space-y-4 mt-10">
      {postAvilable?.map((item) => (
        <div
          key={item.PostId}
          className="flex justify-between w-full bg-card p-5 border border-slate-600"
        >
          <div>
            <h1 className="text-3xl text-purple-500 font-semibold">
              {item.title}
            </h1>
            <p className="text-muted-foreground">
              Posted on: {dayjs(item.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
          <div>
            <Button variant={"ghost"}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button variant={"ghost"}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
