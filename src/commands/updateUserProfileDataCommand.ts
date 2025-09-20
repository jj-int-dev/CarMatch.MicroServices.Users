import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';
import type { UserProfileDataSchema } from '../validators/requests/userProfileDataValidator';

export default async function (
  userId: string,
  profileData: UserProfileDataSchema,
  profilePicUrl?: string
): Promise<number> {
  const affectedRows = await db
    .update(users)
    .set({
      displayName: profileData.displayName,
      phoneNumber: profileData.phoneNumber,
      gender: profileData.gender,
      bio: profileData.bio,
      ...(Boolean(profilePicUrl) && { avatarUrl: profilePicUrl }),
      ...(Boolean(profileData.userType) && { userType: profileData.userType })
    })
    .where(eq(users.userId, userId));
  return affectedRows.length;
}
