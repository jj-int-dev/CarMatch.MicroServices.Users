import type { UserProfile } from '../dtos/userProfile';
import type { UserProfileSchema } from '../validators/database/userProfileValidator';

export default function (userProfileSchema: UserProfileSchema): UserProfile {
  const {
    email,
    displayName,
    phoneNumber,
    gender,
    dateOfBirth,
    bio,
    firstLoginCompleted,
    userType
  } = userProfileSchema!;
  return {
    email,
    displayName,
    phoneNumber,
    gender,
    dateOfBirth,
    bio,
    firstLoginCompleted,
    userType: userType?.type ?? null
  };
}
