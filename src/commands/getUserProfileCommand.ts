import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';

/**
 *
 * @param userId The ID of the user whose profile should be fetched
 * @returns The profile data if it exists
 */
export default async function (userId: string) {
  return await db.query.users.findFirst({
    columns: {
      email: true,
      displayName: true,
      phoneNumber: true,
      gender: true,
      bio: true,
      avatarurl: true
    },
    with: {
      userTypes: {
        columns: { type: true }
      }
    },
    where: eq(users.userId, userId)
  });
}
