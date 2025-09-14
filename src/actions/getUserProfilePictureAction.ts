import getUserProfilePictureCommand from '../commands/getUserProfilePictureCommand';

/**
 *
 * @param userId The ID of the user whose profile picture url should be fetched
 * @returns The profile picture url
 * @throws {Error} When a valid image url has not been returned from the database
 */
export default async function (userId: string) {
  console.log('Entering GetUserProfilePictureAction ...');
  const { success, data, error } = await getUserProfilePictureCommand(userId);

  if (success && data) {
    const { avatarUrl } = data;
    console.log(
      `Successfully retrieved profile url for user with userId ${userId}: ${avatarUrl}` +
        `\nExiting GetUserProfilePictureAction ...`
    );
    return avatarUrl;
  }

  const errorMsg = `Could not find the profile picture for user ${userId}`;
  const moreDetails = error?.message ? `: ${error.message}` : '';
  console.error(`${errorMsg}${moreDetails}`);
  throw new Error(errorMsg);
}
