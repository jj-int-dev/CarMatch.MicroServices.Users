import updateUserProfileDataCommand from '../commands/updateUserProfileDataCommand';
import uploadUserProfilePictureCommand from '../commands/uploadUserProfilePictureCommand';
import HttpResponseError from '../dtos/httpResponseError';
import type { UserProfile } from '../dtos/userProfile';
import type { UserProfileDataSchema } from '../validators/requests/userProfileDataValidator';
import getUserProfileAction from './getUserProfileAction';

/**
 *
 * @param userId The ID of the user whose profile should be updated
 * @param profilePicture The profile picture image file
 * @param newProfileData The data to update the user's profile with
 * @returns The updated user's profile data
 * @throws {HttpResponseError} When the user's profile could not be updated
 */
export default async function (
  userId: string,
  profilePicture: Express.Multer.File | undefined,
  newProfileData: UserProfileDataSchema
): Promise<UserProfile> {
  console.log('Entering UpdateUserProfileAction ...');

  let profilePicUrl: string | undefined = undefined;

  //if profile picture was included in request, upload it to storage
  if (profilePicture?.buffer && profilePicture?.mimetype) {
    const { publicUrl, error } = await uploadUserProfilePictureCommand(
      userId,
      profilePicture
    );

    if (error) {
      const errorMsg =
        'Error occurred while attempting to upload profile picture';
      console.error(`${errorMsg}: ${error}`);
      throw new HttpResponseError(500, errorMsg);
    }

    if (publicUrl) profilePicUrl = publicUrl;
  }

  // update the rest of the user profile data
  const numUpdatedRows = await updateUserProfileDataCommand(
    userId,
    newProfileData,
    profilePicUrl
  );

  // return updated user profile data
  if (numUpdatedRows === 1) {
    console.log(
      `Successfully updated profile of user with userId ${userId}. Exiting UpdateUserProfileAction...`
    );
    return await getUserProfileAction(userId);
  }

  console.error(
    `Unexpected number of user rows updated with the provided profile data:` +
      `\nProfile pic url: ${profilePicUrl}\nProfile data:\n${newProfileData}` +
      `\nRows updated: ${numUpdatedRows}`
  );
  throw new HttpResponseError(
    500,
    'Error occurred while attempting to update user type'
  );
}
