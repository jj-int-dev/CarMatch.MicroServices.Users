import deleteUserProfilePictureCommand from '../commands/deleteUserProfilePictureCommand';
import deleteUserProfilePictureUrlCommand from '../commands/deleteUserProfilePictureUrlCommand';
import HttpResponseError from '../dtos/httpResponseError';

/**
 *
 * @param userId The ID of the user whose profile picture should be deleted
 * @throws {HttpResponseError} When the user's profile pciture could not be deleted
 */
export default async function (userId: string): Promise<void> {
  console.log('Entering DeleteUserProfilePictureAction ...');

  const errorMsg = await deleteUserProfilePictureCommand(userId);

  if (errorMsg) {
    console.error(
      `Error occurred while attempting to delete profile picture: ${errorMsg}`
    );
    throw new HttpResponseError(500, errorMsg);
  }

  const numUpdatedRows = await deleteUserProfilePictureUrlCommand(userId);

  console.log(
    `${numUpdatedRows} records updated during the profile picture deletion process for user with userId ${userId}. Exiting DeleteUserProfilePictureAction...`
  );
}
