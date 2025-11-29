import updateDiscoveryPreferencesCommand from '../commands/updateDiscoveryPreferencesCommand';
import HttpResponseError from '../dtos/httpResponseError';
import type { DiscoveryPreferencesSchema } from '../validators/requests/discoveryPreferencesValidator';

/**
 *
 * @param userId The ID of the user whose discovery preferences should be updated
 * @param discoveryPreferences The discovery preferences to set for the user
 * @throws {HttpResponseError} When the user's discovery preferences could not be updated
 */
export default async function (
  userId: string,
  discoveryPreferences: DiscoveryPreferencesSchema
): Promise<void> {
  console.log('Entering UpdateDiscoveryPreferencesAction ...');

  const numUpdatedRows = await updateDiscoveryPreferencesCommand(
    userId,
    discoveryPreferences
  );

  if (numUpdatedRows < 1) {
    console.error(
      `Could not update the discovery preferences of the user with userId ${userId}`
    );
    throw new HttpResponseError(
      500,
      'Error occurred while attempting to update discovery preferences'
    );
  }

  console.log(
    `${numUpdatedRows} records updated, successfully updated discovery preferences of user with userId ${userId}. Exiting UpdateDiscoveryPreferencesAction...`
  );
}
