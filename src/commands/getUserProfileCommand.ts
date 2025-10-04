import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';
import {
  userProfileValidator,
  type UserProfileSchema
} from '../validators/database/userProfileValidator';
import type { ZodSafeParseResult } from 'zod';

/**
 *
 * @param userId The ID of the user whose profile should be fetched
 * @returns The profile data if it exists
 */
export default async function (
  userId: string
): Promise<ZodSafeParseResult<UserProfileSchema>> {
  return userProfileValidator.safeParse(
    await db.query.users.findFirst({
      columns: {
        email: true,
        displayName: true,
        phoneNumber: true,
        gender: true,
        dateOfBirth: true,
        bio: true,
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
