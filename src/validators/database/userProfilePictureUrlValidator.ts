import * as z from 'zod';

export const userProfilePictureUrlValidator = z
  .object({
    avatarUrl: z
      .string()
      .regex(/^https:\/\/.+/)
      .nullable()
  })
  .optional();

export type UserProfilePictureUrlSchema = z.infer<
  typeof userProfilePictureUrlValidator
>;
