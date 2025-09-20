import updateUserProfileDataCommand from '../commands/updateUserProfileDataCommand';
import uploadUserProfilePictureCommand from '../commands/uploadUserProfilePictureCommand';
import HttpResponseError from '../dtos/httpResponseError';
import type { UserProfile } from '../dtos/userProfile';
import type { UserProfileDataSchema } from '../validators/requests/userProfileDataValidator';
import getUserProfileAction from './getUserProfileAction';

export default async function (
  userId: string,
  profilePicture: Express.Multer.File | undefined,
  newProfileData: UserProfileDataSchema
): Promise<UserProfile> {
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
  if (numUpdatedRows === 1) return await getUserProfileAction(userId);

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
