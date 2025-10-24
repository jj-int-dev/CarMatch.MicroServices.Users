import updateUserProfileDataCommand from '../commands/updateUserProfileDataCommand';
import HttpResponseError from '../dtos/httpResponseError';
import type { UserProfile } from '../dtos/userProfile';
import type { UserProfileDataSchema } from '../validators/requests/userProfileDataValidator';
import getUserProfileAction from './getUserProfileAction';

/**
 *
 * @param userId The ID of the user whose profile should be updated
 * @param newProfileData The data to update the user's profile with
 * @returns The updated user's profile data
 * @throws {HttpResponseError} When the user's profile could not be updated
 */
export default async function (
  userId: string,
  newProfileData: UserProfileDataSchema
): Promise<UserProfile> {
  console.log('Entering UpdateUserProfileAction ...');

  // update the rest of the user profile data
  const numUpdatedRows = await updateUserProfileDataCommand(
    userId,
    newProfileData
  );

  // return updated user profile data
  if (numUpdatedRows > 0) {
    console.log(
      `${numUpdatedRows} records updated, successfully updated profile of user with userId ${userId}. Exiting UpdateUserProfileAction...`
    );
    return await getUserProfileAction(userId);
  }

  console.error(
    `Could not update the profile data of the user with userId ${userId} to the provided profile data:` +
      `\nProfile data:\n${newProfileData}` +
      `\nRecords updated: ${numUpdatedRows}`
  );
  throw new HttpResponseError(
    500,
    'Error occurred while attempting to update user profile'
  );
}
