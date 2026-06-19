import z from "zod";

export const createNoteDto = z.object({
    title: z.string(),
    content: z.string(),
    category: z.string().optional()
})
