import { z } from "zod";

export const formSchema = z.object({
  lookback: z
    .number()
    .min(1, "Lookback period must be at least 1 day")
    .max(365, "Lookback period cannot exceed 365 days"),
});

type FormData = z.infer<typeof formSchema>;

export default FormData;
