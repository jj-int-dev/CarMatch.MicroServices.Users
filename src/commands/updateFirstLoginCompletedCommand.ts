import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 *
 * @param userId The ID of the user whose first login completed status should be updated
 * @param firstLoginCompleted The boolean value indicating if the user has completed their first login or not
 * @returns The amount of rows in the database that were updated
 */
export default async function (
  userId: string,
  firstLoginCompleted: boolean
): Promise<number> {
  const affectedRows = await db
    .update(users)
    .set({ firstLoginCompleted })
    .where(eq(users.userId, userId));
  return affectedRows.length;
}
