import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

const discoveryPreferencesValidations = z
  .object({
    minAge: z.number().min(0, 'Invalid minimum age'),
    maxAge: z.number().max(480, 'Invalid maximum age'),
    gender: z.literal(['', 'Male', 'Female'], 'Invalid gender'),
    maxDistanceKm: z
      .number()
      .min(1, 'Invalid maximum distance')
      .max(250, 'Invalid maximum distance'),
    neutered: z.boolean('Invalid neutered status')
  })
  .refine(
    (formData) => {
      if (formData.maxAge < formData.minAge) {
        return false;
      }
    },
    {
      error: 'Invalid age range',
      path: ['minAge', 'maxAge']
    }
  );

export type DiscoveryPreferencesSchema = z.infer<
  typeof discoveryPreferencesValidations
>;

export function discoveryPreferencesValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const discoveryPrefsData = discoveryPreferencesValidations.safeParse(
      req.body
    );

    if (!discoveryPrefsData.success) {
      const errors = discoveryPrefsData.error.issues.map(
        (issue) => issue.message
      );
      console.log(
        `Discovery preferences validation error(s):\n${errors.join('\n')}`
      );
      return res.status(400).json({ message: 'Invalid discovery preferences' });
    }

    return next();
  } catch (err) {
    console.log(
      `Error occurred during discovery preferences validation middleware: ${err}`
    );
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
