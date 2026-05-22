import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2),
  group_id: z.string().uuid().optional()
});