import updateFirstLoginCompletedCommand from '../commands/updateFirstLoginCompletedCommand';
import HttpResponseError from '../dtos/httpResponseError';

/**
 *
 * @param userId The ID of the user whose first login completed status should be updated
 * @param firstLoginCompleted The boolean value indicating if the user has completed their first login or not
 * @returns Void
 * @throws {HttpResponseError} When the first login completed status could not be updated
 */
export default async function (
  userId: string,
  firstLoginCompleted: boolean
): Promise<void> {
  console.log('Entering UpdateFirstLoginCompletedAction...');

  const numUpdatedRows = await updateFirstLoginCompletedCommand(
    userId,
    firstLoginCompleted
  );

  if (numUpdatedRows < 1) {
    console.error(
      `Could not update the first login completed status of user with userId ${userId} to ${firstLoginCompleted}: ${numUpdatedRows} record(s) updated`
    );
    throw new HttpResponseError(
      500,
      'Error occurred while attempting to update first login completed status'
    );
  }

  console.log(
    `${numUpdatedRows} records updated, successfully updated first login completed status for the user with userId ${userId} to ${firstLoginCompleted}. Exiting UpdateFirstLoginCompletedAction...`
  );
}
