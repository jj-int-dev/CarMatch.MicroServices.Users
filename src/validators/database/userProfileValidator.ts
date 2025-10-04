import * as z from 'zod';

export const userProfileValidator = z
  .object({
    email: z.email(),
    displayName: z.string().nullable(),
    phoneNumber: z.e164().nullable(),
    gender: z.literal(['Man', 'Woman', '']).nullable(),
    bio: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    userType: z.object({ type: z.literal(['Rehomer', 'Adopter']) }).nullable(),
    dateOfBirth: z.iso
      .date()
      .refine((date) => new Date(date) < new Date(), {
        message: 'Date of birth must be before today'
      })
      .nullable()
  })
  .optional();

export type UserProfileSchema = z.infer<typeof userProfileValidator>;
