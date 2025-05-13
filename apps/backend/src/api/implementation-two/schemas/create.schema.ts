import { z } from "zod";

export const createExampleSchema = z.object({});

export type CreateExample = z.infer<typeof createExampleSchema>;
