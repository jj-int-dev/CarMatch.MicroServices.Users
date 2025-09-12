import type { UserProfile } from '../dataTypes/userProfile';
import type { UserProfileSchema } from '../validators/database/userProfileValidator';

export default function (userProfileSchema: UserProfileSchema): UserProfile {
  const { email, displayName, phoneNumber, gender, bio, avatarurl, type } =
    userProfileSchema;
  return {
    email,
    displayName,
    phoneNumber,
    gender,
    bio,
    avatarUrl: avatarurl,
    userType: type
  };
}
