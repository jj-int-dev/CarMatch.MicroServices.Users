import getUserProfileCommand from '../commands/getUserProfileCommand';
import userProfileSchemaToUserProfile from '../mappers/userProfileSchemaToUserProfile';
import {
  userProfileValidator,
  type UserProfileSchema
} from '../validators/database/userProfileValidator';
import type { UserProfile } from '../dataTypes/userProfile';

/**
 *
 * @param userId The ID of the user whose profile picture should be fetched
 * @returns The profile data
 * @throws {Error} When no user data was returned from the database
 */
export default async function (userId: string): Promise<UserProfile> {
  console.log('Entering GetUserProfileAction ...');
  const profileResponse = userProfileValidator.safeParse(
    await getUserProfileCommand(userId)
  );
  if (profileResponse.success) {
    const userProfile: UserProfileSchema = profileResponse.data;
    const profileDetails = userProfileSchemaToUserProfile(userProfile);
    console.log(
      `Successfully retrieved profile for user with userId ${userId}. Exiting GetUserProfilePictureAction ...`
    );
    return profileDetails;
  }
  const {
    error: { message }
  } = profileResponse;
  console.error(`Could not find the profile for user ${userId}: ${message}`);
  throw new Error(message);
}
