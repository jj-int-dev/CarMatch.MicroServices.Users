import getUserTypeIdCommand from '../commands/getUserTypeIdCommand';
import updateUserTypeCommand from '../commands/updateUserTypeCommand';
import HttpResponseError from '../dtos/httpResponseError';

export default async function (
  userId: string,
  userType: string
): Promise<string> {
  const { success, data, error } = await getUserTypeIdCommand(userType);

  if (!success || !data) {
    console.error(
      `Could not find the userTypeId of the provided user type ${userType}: ${error.message}`
    );
    throw new HttpResponseError(400, 'Invalid user type');
  }

  const { userTypeId } = data;

  const numUpdatedRows = await updateUserTypeCommand(userId, userTypeId);

  if (numUpdatedRows === 1) return userType;

  console.error(
    `Unexpected number of user rows updated with the userTypeId ${userTypeId}: ${numUpdatedRows} row(s)`
  );
  throw new HttpResponseError(
    500,
    'Error occurred while attempting to update user type'
  );
}
