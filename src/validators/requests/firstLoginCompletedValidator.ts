import type { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

const firstLoginCompletedValidation = z.object({
  firstLoginCompleted: z.boolean()
});

export function firstLoginCompletedValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const firstLoginCompleted = firstLoginCompletedValidation.safeParse(
      req.body
    );

    if (!firstLoginCompleted.success) {
      console.log(
        `First Login Completed Validation Error: ${firstLoginCompleted.error.message}`
      );
      return res
        .status(400)
        .json({ message: 'Invalid value received for First Login Completed' });
    }

    return next();
  } catch (err) {
    console.log(
      `Error occurred during first login completed validation middleware: ${err}`
    );
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
