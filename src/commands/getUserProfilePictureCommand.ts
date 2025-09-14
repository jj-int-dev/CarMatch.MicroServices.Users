import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';
import {
  userProfilePictureUrlValidator,
  type UserProfilePictureUrlSchema
} from '../validators/database/userProfilePictureUrlValidator';
import type { ZodSafeParseResult } from 'zod';

/**
 *
 * @param userId The ID of the user whose profile picture url should be fetched
 * @returns The profile picture url if it exists
 */
export default async function (
  userId: string
): Promise<ZodSafeParseResult<UserProfilePictureUrlSchema>> {
  return userProfilePictureUrlValidator.safeParse(
    await db.query.users.findFirst({
      columns: { avatarUrl: true },
      where: eq(users.userId, userId)
    })
  );
}
