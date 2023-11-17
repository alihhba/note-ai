import * as z from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, {message: 'content is required'})
});

export type noteValidation = z.infer<typeof noteSchema>;

export const editNoteSchema = z.object({
  title: z.string(),
  content: z.string()
});

export type editNoteValidation = z.infer<typeof editNoteSchema>;

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
