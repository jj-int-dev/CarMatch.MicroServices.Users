import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';
import {
  userProfilePictureUrlAndTypeValidator,
  type UserProfilePictureUrlAndTypeSchema
} from '../validators/database/userProfilePictureUrlAndTypeValidator';
import type { ZodSafeParseResult } from 'zod';

/**
 *
 * @param userId The ID of the user whose profile picture and user type should be fetched
 * @returns The profile picture url and user type if they exist
 */
export default async function (
  userId: string
): Promise<ZodSafeParseResult<UserProfilePictureUrlAndTypeSchema>> {
  return userProfilePictureUrlAndTypeValidator.safeParse(
    await db.query.users.findFirst({
      columns: {
        avatarUrl: true
      },
      with: {
        userType: {
          columns: { type: true }
        }
      },
      where: eq(users.userId, userId)
    })
  );
}
