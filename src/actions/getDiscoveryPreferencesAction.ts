import getDiscoveryPreferencesCommand from '../commands/getDiscoveryPreferencesCommand';
import type { DiscoveryPreferencesSchema } from '../validators/database/discoveryPreferencesValidator';
import HttpResponseError from '../dtos/httpResponseError';

/**
 *
 * @param userId The ID of the user whose discovery preferences should be fetched
 * @returns The discovery preferences
 * @throws {HttpResponseError} If an error occurred while fetching the discovery preferences
 */
export default async function (
  userId: string
): Promise<DiscoveryPreferencesSchema> {
  console.log('Entering GetDiscoveryPreferencesAction ...');
  const { success, data, error } = await getDiscoveryPreferencesCommand(userId);

  if (success) {
    console.log(
      `Successfully retrieved discovery preferences for user with userId ${userId}\nExiting GetDiscoveryPreferencesAction ...`
    );
    return data;
  }

  const errorMsg = `Error occurred while fetching the discovery preferences of user ${userId}`;
  const moreDetails = error?.message ? `: ${error.message}` : '';
  console.error(`${errorMsg}${moreDetails}`);
  throw new HttpResponseError(500, errorMsg);
}
