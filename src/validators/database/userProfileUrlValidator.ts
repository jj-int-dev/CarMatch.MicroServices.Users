import * as z from 'zod';

export const userProfileUrlValidator = z.object({
  avatarurl: z.string().regex(/^https:\/\/.+/)
});
