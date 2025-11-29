import * as z from 'zod';

export const discoveryPreferencesValidator = z
  .object({
    minAge: z.number().min(0).nullable(),
    maxAge: z.number().max(480).nullable(),
    gender: z.literal(['', 'Male', 'Female']).nullable(),
    maxDistanceKm: z.number().min(1).max(250).nullable(),
    neutered: z.boolean().nullable()
  })
  .optional();

export type DiscoveryPreferencesSchema = z.infer<
  typeof discoveryPreferencesValidator
>;
