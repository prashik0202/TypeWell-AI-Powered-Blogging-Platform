import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { navlinks } from "@/constants";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Header = () => {
  return (
    <>
      <MobileHeader />
      <DesktopHeader />
    </>
  );
};

async function MobileHeader() {
  const user = await currentUser();
  return (
    <div className="block md:hidden">
      <nav className="flex items-center justify-start px-2 w-full fixed top-0 py-2 shadow-xl z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <UserButton />

                {/* {user && <h1>Welcome,{user?.firstName}</h1>} */}
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-y-3 mt-10">
              {navlinks.map((item, idx) => {
                return (
                  <Link href={item.link} className="flex items-center">
                    <Button
                      size={"sm"}
                      variant={"link"}
                      className="flex items-center gap-x-2"
                    >
                      {/* <Image src={item.icon} alt="icon" className="h-4 w-4" /> */}
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
              {user && (
                <Link href={"/profile"}>
                  <Button
                    size={"sm"}
                    variant={"link"}
                    // className="flex items-center gap-x-2"
                  >
                    Profile
                  </Button>
                </Link>
              )}
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
        <Link href={"/"}>
          <h1 className="text-xl">Typewell</h1>
        </Link>
      </nav>
    </div>
  );
}

async function DesktopHeader() {
  const user = await currentUser();

  return (
    <div className="hidden md:block">
      <nav className=" bg-background w-full fixed top-0 px-5 py-7 shadow-lg dark:shadow-slate-900  flex flex-wrap justify-between gap-x-3 z-50 items-center  ">
        <div className="flex gap-x-2 items-center">
          <Link href={"/"}>
            <h1 className="text-2xl">Typewell</h1>
          </Link>
          {navlinks.map((item, idx) => {
            return (
              <Link href={item.link} className="flex items-center">
                <Button
                  size={"sm"}
                  variant={"link"}
                  className="flex items-center gap-x-2"
                >
                  {/* <Image src={item.icon} alt="icon" className="h-4 w-4" /> */}
                  {item.name}
                </Button>
              </Link>
            );
          })}
          {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
        </div>
        <div className="flex flex-row gap-x-3 items-center">
          {user && (
            <Link href={"/profile"}>
              <Button
                size={"sm"}
                variant={"link"}
                // className="flex items-center gap-x-2"
              >
                Profile
              </Button>
            </Link>
          )}
          {/* {user && <h1>{user?.firstName}</h1>} */}
          <UserButton />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}

export default Header;
