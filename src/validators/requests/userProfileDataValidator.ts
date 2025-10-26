import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

// we allow fields to be empty strings in case user wants to clear previously set values
const userProfileDataValidations = z.object({
  displayName: z.string().min(1, { message: 'Display name is required' }),
  phoneNumber: z.union([z.e164(), z.literal('')]), //empty string or E.164 format phone number
  gender: z.literal(['Man', 'Woman', '']),
  dateOfBirth: z.union([
    z.literal(''),
    z.iso.date().refine((date) => new Date(date) < new Date(), {
      message: 'Date of birth must be valid and before today'
    })
  ]),
  bio: z.string(),
  userType: z.literal(['Rehomer', 'Adopter']).optional()
});

export type UserProfileDataSchema = z.infer<typeof userProfileDataValidations>;

export function userProfileDataValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newProfileData = userProfileDataValidations.safeParse(req.body);

    if (!newProfileData.success) {
      const errors = newProfileData.error.issues.map((issue) => issue.message);
      console.log(`Profile data validation error(s):\n${errors.join('\n')}`);
      return res.status(400).json({ message: 'Invalid user profile data' });
    }

    return next();
  } catch (err) {
    console.log(
      `Error occurred during new profile data validation middleware: ${err}`
    );
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
