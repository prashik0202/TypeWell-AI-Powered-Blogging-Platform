"use client";

import React, { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreatePostSchemaType, CreatePostSchema } from "@/schema/post";
import {
  useMutation,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { CreatePost } from "../_actions/CreatePost";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/Tiptap";
import { Switch } from "@/components/ui/switch";
import { redirect } from "next/navigation";

const CreatePostPage = () => {
  // const user = await currentUser();
  // defining form
  const form = useForm<CreatePostSchemaType>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      premium: false,
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreatePost,
    onSuccess: () => {
      //code run after success
      // give toast to user for successfullu create of post
      toast.success("Post created successfully🎉", {
        id: "create-post",
      });

      redirect("/");
      //reset the form
      form.reset({
        content: " ",
        description: " ",
        premium: false,
        title: " ",
      });
    },
  });

  // onsubmit function
  const onSubmit = React.useCallback(
    (values: CreatePostSchemaType) => {
      toast.loading("Creating Post...", {
        id: "create-post",
      });

      mutate({
        ...values,
      });
    },
    [mutate]
  );

  // AI Text Completion logic

  async function callGeminiApi(prompt: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      setLoading(true);

      if (!response.ok) {
        throw new Error("Opps error occured" + response.statusText);
      }

      const text = await response.text();
      return text;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  }
  const [content, setContent] = useState<string>("");
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log(form.getValues("description"));
    // await console.log("Hello");
    const apiResponse = await callGeminiApi(form.getValues("description"));
    if (apiResponse !== undefined) {
      console.log(apiResponse);
      setContent(apiResponse);
    }
  };

  return (
    <div className="my-10">
      <Button
        variant={"outline"}
        className="bg-purple-200 dark:bg-purple-700 my-2"
        onClick={() => handleSubmit()}
        disabled={Loading}
      >
        {Loading ? "Loading..." : "Generate with AI"}
      </Button>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-10 gap-x-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input defaultValue={""} {...field} />
                </FormControl>
                <FormDescription>
                  Mentioned your Blog title here
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input defaultValue={""} {...field} />
                </FormControl>
                <FormDescription>
                  Mentioned your Blog decsription
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="premium"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Premium Content</FormLabel>
                  <FormDescription>
                    By enabling this your content only visible to premium users
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  {/* <Textarea
                    defaultValue={""}
                    {...field}
                    className="h-[600px] resize-none"
                  /> */}
                  <Tiptap content={content} onChange={field.onChange} />
                </FormControl>
                <FormDescription>Your Blog content goes here</FormDescription>
              </FormItem>
            )}
          />
          {/* <Tiptap /> */}
          <Button
            className="w-full mt-5"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Post
          </Button>
        </form>
      </Form>
      <p className="mt-5 text-sm">
        Based on description mentioned you can generate Content for your Blog
        post using A.I
      </p>
    </div>
  );
};

export default CreatePostPage;
