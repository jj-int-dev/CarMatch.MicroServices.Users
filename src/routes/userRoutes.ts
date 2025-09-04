import { Router, type Request, type Response } from 'express';
import isAuthorized from '../utils/isAuthorized';

const router = Router();

router.get('/', isAuthorized, (req: Request, res: Response) => {
  return res.status(200);
});

export default router;
