import * as z from 'zod';

export const userTypeIdValidator = z.object({
  userTypeId: z.literal([1, 2])
});

export type UserTypeIdSchema = z.infer<typeof userTypeIdValidator>;
