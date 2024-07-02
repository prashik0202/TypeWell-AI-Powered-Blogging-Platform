"use client";
import { getAllPostResponseType } from "@/app/api/post/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Pencil, Trash } from "lucide-react";
import React from "react";

const UserPosts = () => {
  // fetching user posts
  const allPosts = useQuery<getAllPostResponseType>({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await fetch("/api/userPost");
      return await res.json();
    },
  });

  const postAvilable = allPosts.data;

  console.log(postAvilable);

  return (
    <>
      <div className="mt-10">
        {postAvilable?.length === 0 && (
          <div className="w-full  p-5">
            <h1 className="text-center text-3xl">No Post Yet.. 😔</h1>
          </div>
        )}
      </div>
      <div className="mt-10 grid  grid-cols-1 md:grid-cols-2 gap-6">
        {postAvilable?.map((item) => (
          <div
            key={item.PostId}
            className="flex justify-between w-full bg-card p-10 border border-none shadow-2xl dark:shadow-slate-800 "
          >
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl text-purple-500 font-semibold">
                  {item.title}
                </h1>
                <p className="text-muted-foreground">
                  Posted on: {dayjs(item.createdAt).format("MMM DD, YYYY")}
                </p>
              </div>
              <div className="flex mt-5 justify-start space-x-7">
                <Badge
                  className={item.premium ? "bg-yellow-400" : "bg-green-400"}
                >
                  {item.premium ? "Paid" : "Free"}
                </Badge>
                <Switch checked={item.premium} />
              </div>
            </div>
            <div>
              <Button variant={"ghost"}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant={"ghost"}>
                <Trash className="w-4 h-4" />
              </Button>
              {/* <FormControl><Switch /></FormControl> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPosts;
