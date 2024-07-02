import React from "react";
import { Button } from "./ui/button";
import { SquareArrowOutUpRight, Star } from "lucide-react";
import dayjs from "dayjs";
import { Badge } from "./ui/badge";
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
    <div className="w-full flex flex-col  border bg-card justify-start shadow-2xl dark:shadow-slate-800 dark:border-none">
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
        <Button variant={"ghost"} className=" mt-4" asChild>
          <Link href={`/${postId}`}>
            Read Now <SquareArrowOutUpRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
