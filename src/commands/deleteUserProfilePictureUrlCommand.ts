import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 *
 * @param userId The ID of the user whose profile picture url should be deleted
 * @returns The amount of rows in the database that were affected
 */
export default async function (userId: string): Promise<number> {
  const updatedRows = await db
    .update(users)
    .set({
      avatarUrl: null
    })
    .where(eq(users.userId, userId))
    .returning();
  return updatedRows.length;
}
