import { userSearchPreferences } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';
import type { DiscoveryPreferencesSchema } from '../validators/requests/discoveryPreferencesValidator';

/**
 *
 * @param userId The ID of the user whose discovery preferences should be updated
 * @param discoveryPreferences Thenew discovery preferences to set for the user
 * @returns The amount of rows in the database that were updated
 */
export default async function (
  userId: string,
  discoveryPreferences: DiscoveryPreferencesSchema
): Promise<number> {
  const updatedRows = await db
    .update(userSearchPreferences)
    .set({
      minAgeMonths: discoveryPreferences.minAge,
      maxAgeMonths: discoveryPreferences.maxAge,
      gender: discoveryPreferences.gender,
      maxDistanceKm: discoveryPreferences.maxDistanceKm
    })
    .where(eq(userSearchPreferences.userId, userId))
    .returning();

  // Return the number of updated rows
  return updatedRows.length;
}
