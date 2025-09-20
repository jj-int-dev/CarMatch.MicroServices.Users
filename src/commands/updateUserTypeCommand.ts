import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

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
