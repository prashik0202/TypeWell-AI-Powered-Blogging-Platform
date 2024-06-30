import { z } from "zod";

// creating a zod object for post validation
export const CreatePostSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(15),
  content: z.string().min(50).max(9999),
  premium: z.boolean(),
});

// Exteacting the indered type from above schema
export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;
