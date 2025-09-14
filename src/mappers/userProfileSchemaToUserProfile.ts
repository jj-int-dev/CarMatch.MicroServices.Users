import type { UserProfile } from '../dtos/userProfile';
import type { UserProfileSchema } from '../validators/database/userProfileValidator';

export default function (userProfileSchema: UserProfileSchema): UserProfile {
  const { email, displayName, phoneNumber, gender, bio, avatarUrl, usertype } =
    userProfileSchema!;
  return {
    email,
    displayName,
    phoneNumber,
    gender,
    bio,
    avatarUrl,
    userType: usertype?.type ?? null
  };
}
