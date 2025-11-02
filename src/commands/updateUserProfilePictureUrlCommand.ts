import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 *
 * @param userId The ID of the user whose profile picture should be updated
 * @param profilePicUrl The url  of the user's updated profile picture
 * @returns The amount of rows in the database that were updated
 */
export default async function (
  userId: string,
  profilePicUrl: string
): Promise<number> {
  const updatedRows = await db
    .update(users)
    .set({
      avatarUrl: profilePicUrl
    })
    .where(eq(users.userId, userId))
    .returning();
  return updatedRows.length;
}
