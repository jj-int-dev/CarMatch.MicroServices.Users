import * as z from 'zod';

export const userProfileValidator = z.object({
  email: z.email(),
  displayName: z.string().optional(),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  bio: z.string().optional(),
  avatarurl: z.string().optional(),
  type: z.string().optional()
});

export type UserProfileSchema = z.infer<typeof userProfileValidator>;
