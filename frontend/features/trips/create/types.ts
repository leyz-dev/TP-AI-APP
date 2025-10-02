import { z } from "zod";
import { formSchema } from "./constants";

export type FormValues = z.infer<typeof formSchema>;
