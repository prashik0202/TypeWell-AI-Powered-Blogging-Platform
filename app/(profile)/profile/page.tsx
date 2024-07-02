import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import UserPosts from "./_components/UserPosts";
import UserDetails from "./_components/UserDetails";

const ProfilePage = async () => {
  const user = await currentUser();
  return (
    <div>
      <section>
        <h1 className="text-4xl">Profile</h1>
        <h1 className="text-2xl mt-5">Welcome! {user?.fullName}</h1>
        <UserDetails />
      </section>
      <section>
        <UserPosts />
      </section>
    </div>
  );
};

export default ProfilePage;
