import { Router, type Request, type Response } from 'express';
import isAuthorized from '../utils/isAuthorized';

const router = Router();

router.get(
  '/',
  /*isAuthorized,*/ (req: Request, res: Response) => {
    return res.status(200).json({ body: 'good' });
  }
);

export default router;
