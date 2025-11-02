import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';
import type { UserProfileDataSchema } from '../validators/requests/userProfileDataValidator';

/**
 *
 * @param userId The ID of the user whose profile should be updated
 * @param profileData The data to update the user's profile with
 * @returns The amount of rows in the database that were updated
 */
export default async function (
  userId: string,
  profileData: UserProfileDataSchema
): Promise<number> {
  const updatedRows = await db
    .update(users)
    .set({
      displayName: profileData.displayName,
      phoneNumber: profileData.phoneNumber,
      gender: profileData.gender,
      bio: profileData.bio,
      dateOfBirth: profileData.dateOfBirth,
      ...(Boolean(profileData.userType) && { userType: profileData.userType })
    })
    .where(eq(users.userId, userId))
    .returning();

  // Return the number of updated rows
  return updatedRows.length;
}
