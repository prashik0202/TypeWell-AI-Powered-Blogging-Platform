"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UserDetails = () => {
  //  fetching user details
  const userData = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      return await res.json();
    },
  });

  const userDetails = userData.data;
  console.log(userDetails);
  return (
    <div className="flex flex-col md:flex-row justify-start space-x-3 items-center mt-5 ">
      <h1 className="text-l">{userDetails?.email}</h1>

      {userDetails?.premium ? (
        <Badge className="bg-yellow-400">Premium Enabled</Badge>
      ) : (
        <Badge className="bg-green-400">Free Tier</Badge>
      )}
    </div>
  );
};

export default UserDetails;
