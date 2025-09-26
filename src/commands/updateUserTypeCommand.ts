import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 *
 * @param userId The ID of the user whose user type should be updated
 * @param userTypeId The ID of the user type that the user will be assigned
 * @returns The amount of rows in the database that were updated
 */
export default async function (
  userId: string,
  userTypeId: number
): Promise<number> {
  const affectedRows = await db
    .update(users)
    .set({ userTypeId })
    .where(eq(users.userId, userId));
  return affectedRows.length;
}
