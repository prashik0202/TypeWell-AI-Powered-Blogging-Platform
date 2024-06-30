import React from "react";
import vercelogolight from "@/public/vercel-icon-light.png";
import vercelogodark from "@/public/vercel-icon-dark.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { navlinks } from "@/constants";
import instagramlogo from "@/public/instagram.svg";
import facebooklogo from "@/public/facebook.svg";
import twitterlogo from "@/public/twitter.svg";
import githublogo from "@/public/github.svg";
import { Input } from "./ui/input";

const social_Links = [
  {
    icon: instagramlogo,
  },
  {
    icon: facebooklogo,
  },
  {
    icon: twitterlogo,
  },
  {
    icon: githublogo,
  },
];

const Footer = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row p-10 gap-10 justify-between bg-background ">
      <div className="flex flex-col flex-wrap items-center">
        <Image
          src={vercelogodark}
          alt="logo"
          className="w-32 h-32 block dark:hidden"
        />
        <Image
          src={vercelogolight}
          alt="logo"
          className="w-32 h-32 hidden dark:block"
        />
        <h1 className="text-3xl mt-2">Typewell</h1>
      </div>

      <div className="flex flex-col gap-y-5">
        <h1>Importants Links</h1>
        {navlinks.map((item, idx) => {
          return (
            <Link href={item.link} className="flex items-center">
              <Button
                size={"sm"}
                variant={"link"}
                className="flex items-center gap-x-2 text-foreground"
              >
                {/* <Image src={item.icon} alt='icon' className='h-4 w-4'/> */}
                {item.name}
              </Button>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-y-5">
        <h1>Social Links</h1>
        <div className="flex gap-x-4 ">
          {social_Links.map((item) => (
            <Link href={"#"} key={item.icon}>
              <Image src={item.icon} alt="logo" className="fill-white" />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-5 w-full md:w-1/2">
        <h1>Subscribe to news letter</h1>
        <form action="" className="flex gap-x-2">
          <Input placeholder="Enter your email" className="w-full" />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Footer;
