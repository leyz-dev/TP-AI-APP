import { z } from "zod";

export const activitySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Activity is required"),
  days: z.number().int().nonnegative().optional(),
});

export const dateRangeSchema = z
  .object({
    start: z.string().date("Invalid start date").optional(),
    end: z.string().date("Invalid end date").optional(),
  })
  .refine(
    r => {
      if (!r.start && !r.end) return true; // optional range
      return !!r.start && !!r.end; // both must exist
    },
    { message: "Please select both start and end dates", path: ["end"] }
  )
  .refine(
    r => {
      if (!r.start || !r.end) return true;
      return r.start <= r.end;
    },
    { message: "End date must be after start date", path: ["end"] }
  );

export const formSchema = z.object({
  title: z.string().optional(),
  destination: z.string().min(1, "Destination is required"),
  range: dateRangeSchema.optional(),
  adults: z.number().int().nonnegative().optional(),
  children: z.number().int().nonnegative().optional(),
  notes: z.string().max(250, "Max 250 characters").optional(),
  activities: z.array(activitySchema).optional(),
});
