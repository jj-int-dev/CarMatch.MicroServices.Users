import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 *
 * @param userId The ID of the user whose profile picture url should be deleted
 * @returns The amount of rows in the database that were affected
 */
export default async function (userId: string): Promise<number> {
  const affectedRows = await db
    .update(users)
    .set({
      avatarUrl: null
    })
    .where(eq(users.userId, userId));
  return affectedRows.length;
}
