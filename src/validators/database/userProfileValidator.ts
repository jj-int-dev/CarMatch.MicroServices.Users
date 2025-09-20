import * as z from 'zod';

export const userProfileValidator = z
  .object({
    email: z.email(),
    displayName: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    gender: z.string().nullable(),
    bio: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    userType: z.object({ type: z.string() }).optional()
  })
  .optional();

export type UserProfileSchema = z.infer<typeof userProfileValidator>;
