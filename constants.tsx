import * as z from "zod";

export const formSchema = z.object({
  query: z.string().min(1, {
    message: "Please enter recommendation hint.",
  }),
  
});
