import { userTypes } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';
import {
  userTypeIdValidator,
  type UserTypeIdSchema
} from '../validators/database/userTypeIdValidator';
import type { ZodSafeParseResult } from 'zod';

/**
 *
 * @param userId The ID of the user whose user type ID should be fetched
 * @returns The user type ID if it exists
 */
export default async function (
  userType: string
): Promise<ZodSafeParseResult<UserTypeIdSchema>> {
  return userTypeIdValidator.safeParse(
    await db.query.userTypes.findFirst({
      columns: { userTypeId: true },
      where: eq(userTypes.type, userType)
    })
  );
}
