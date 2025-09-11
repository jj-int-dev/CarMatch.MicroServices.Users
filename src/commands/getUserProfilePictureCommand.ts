import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';

/**
 *
 * @param userId The ID of the user whose profile picture url should be fetched
 * @returns The profile picture url if it exists
 */
export default async function (userId: string) {
  return await db.query.users.findFirst({
    columns: { avatarurl: true },
    where: eq(users.userId, userId)
  });
}
