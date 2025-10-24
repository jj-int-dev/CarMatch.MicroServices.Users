import deleteUserProfilePictureCommand from '../commands/deleteUserProfilePictureCommand';
import uploadUserProfilePictureCommand from '../commands/uploadUserProfilePictureCommand';
import updateUserProfilePictureUrlCommand from '../commands/updateUserProfilePictureUrlCommand';
import HttpResponseError from '../dtos/httpResponseError';

/**
 *
 * @param userId The ID of the user whose profile picture should be updated
 * @param profilePicture The profile picture image file
 * @returns The url of the user's updated profile picture
 * @throws {HttpResponseError} When the user's profile pciture could not be updated
 */
export default async function (
  userId: string,
  profilePicture: Express.Multer.File
): Promise<string> {
  console.log('Entering UpdateUserProfilePictureAction ...');
  const baseErrorMsg =
    'Error occurred while attempting to update profile picture';

  // delete any existing profile pictures for this user from storage
  const deleteFilesErrorMsg = await deleteUserProfilePictureCommand(userId);

  if (deleteFilesErrorMsg) {
    console.error(`${baseErrorMsg}: ${deleteFilesErrorMsg}`);
    throw new HttpResponseError(500, baseErrorMsg);
  }

  const { publicUrl, error } = await uploadUserProfilePictureCommand(
    userId,
    profilePicture
  );

  if (error) {
    console.error(`${baseErrorMsg}: ${error}`);
    throw new HttpResponseError(500, baseErrorMsg);
  }

  const numUpdatedRows = await updateUserProfilePictureUrlCommand(
    userId,
    publicUrl!
  );

  // return updated user profile picture url
  if (numUpdatedRows > 0) {
    console.log(
      `${numUpdatedRows} records updated, successfully updated profile picture of user with userId ${userId}. Exiting UpdateUserProfilePictureAction...`
    );
    return publicUrl!;
  }

  console.error(
    `Could not update the profile picture of the user with userId ${userId}. Records updated: ${numUpdatedRows}`
  );
  throw new HttpResponseError(500, baseErrorMsg);
}
