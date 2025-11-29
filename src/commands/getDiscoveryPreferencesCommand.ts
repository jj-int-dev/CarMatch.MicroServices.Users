import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { userSearchPreferences } from '../database-migrations/schema';
import {
  discoveryPreferencesValidator,
  type DiscoveryPreferencesSchema
} from '../validators/database/discoveryPreferencesValidator';
import type { ZodSafeParseResult } from 'zod';

/**
 *
 * @param userId The ID of the user whose discovery preferences should be updated
 * @returns The discovery preferences if they exist
 */
export default async function (
  userId: string
): Promise<ZodSafeParseResult<DiscoveryPreferencesSchema>> {
  return discoveryPreferencesValidator.safeParse(
    await db.query.userSearchPreferences.findFirst({
      columns: {
        minAgeMonths: true,
        maxAgeMonths: true,
        gender: true,
        maxDistanceKm: true,
        neutered: true
      },
      where: eq(userSearchPreferences.userId, userId)
    })
  );
}
