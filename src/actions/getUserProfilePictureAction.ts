import getUserProfilePictureCommand from '../commands/getUserProfilePictureCommand';
import { userProfileUrlValidator } from '../validators/database/userProfileUrlValidator';

/**
 *
 * @param userId The ID of the user whose profile picture url should be fetched
 * @returns The profile picture url
 * @throws {Error} When a valid image url has not been returned from the database
 */
export default async function (userId: string) {
  console.log('Entering GetUserProfilePictureAction ...');
  const urlResponse = userProfileUrlValidator.safeParse(
    await getUserProfilePictureCommand(userId)
  );
  if (urlResponse.success) {
    const { avatarurl } = urlResponse.data;
    console.log(
      `Successfully retrieved profile url for user with userId ${userId}: ${avatarurl}`
    );
    console.log('Exiting GetUserProfilePictureAction ...');
    return avatarurl;
  }
  const {
    error: { message }
  } = urlResponse;
  console.error(
    `Could not find the profile url for user ${userId}: ${message}`
  );
  throw new Error(message);
}
