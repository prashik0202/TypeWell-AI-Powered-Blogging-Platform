import React from "react";
import Image from "next/image";
import post from "@/public/post.jpg";
import { Button } from "./ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import dayjs from "dayjs";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  created_date: Date;
  author_name: String;
  premium: boolean;
  postId: String;
}

const BlogCard = ({
  title,
  description,
  created_date,
  author_name,
  premium,
  postId,
}: Props) => {
  return (
    <div className="w-full flex flex-col  border drop-shadow-md hover:drop-shadow-xl dark:shadow-white bg-card justify-start">
      <div className="w-full h-full  p-5">
        <h1 className="text-4xl  font-semibold">{title}</h1>
        <p className="text-sm my-2">Posted by: {author_name}</p>

        <Badge
          variant="default"
          className={premium ? " bg-yellow-400" : "bg-emerald-600"}
        >
          {premium ? "Paid" : "Free"}
        </Badge>
      </div>
      <div className="w-full flex flex-col p-5 justify-between">
        <div>
          <p className="text-sm text-muted-foreground mt-2 max-w-fit">
            {description}
          </p>
        </div>
        <p className="text-sm text-foreground">
          Posted On: {dayjs(created_date).format("MMM DD, YYYY")}
        </p>
        <Button variant={"outline"} className="flex items-center gap-x-2 mt-4">
          <Link href={`/${postId}`}>Read Now</Link>
          <SquareArrowOutUpRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
