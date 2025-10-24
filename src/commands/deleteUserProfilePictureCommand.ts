import {
  ALLOWED_FILE_TYPES,
  PROFILE_PICTURE_STORAGE_BUCKET
} from '../utils/constants';
import { supabase } from '../utils/supabaseClient';

/**
 *
 * @param userId The ID of the user whose profile picture should be deleted
 * @returns Null if successful, or an error message if the deletion failed
 */
export default async function (userId: string): Promise<string | null> {
  const folder = `${userId}`;
  const filesToDelete: string[] = [];
  // since we allow multiple file types to be uploaded, a user could theoretically
  // have multiple profile pictures stored (e.g., png and jpg). Therefore, list all
  // files in the user's folder and delete them all
  const { data, error: listFilesError } = await supabase.storage
    .from(PROFILE_PICTURE_STORAGE_BUCKET)
    .list(folder);

  if (listFilesError) return listFilesError.message;

  for (const file of data) {
    filesToDelete.push(`${folder}/${file.name}`);
  }

  if (filesToDelete.length === 0) return null; // nothing to delete

  const { error: deleteFilesError } = await supabase.storage
    .from(PROFILE_PICTURE_STORAGE_BUCKET)
    .remove(filesToDelete);

  return deleteFilesError?.message ?? null;
}
