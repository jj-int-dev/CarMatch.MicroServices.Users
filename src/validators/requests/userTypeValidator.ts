import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

const userTypeValidations = z.object({
  userType: z.literal(['Rehomer', 'Adopter'])
});

export function userTypeValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUserType = userTypeValidations.safeParse(req.body);

    if (!newUserType.success) {
      console.log(`User type validation error: ${newUserType.error.message}`);
      return res.status(400).json({ message: 'Invalid user type' });
    }

    return next();
  } catch (err) {
    console.log(
      `Error occurred during new user type validation middleware: ${err}`
    );
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
