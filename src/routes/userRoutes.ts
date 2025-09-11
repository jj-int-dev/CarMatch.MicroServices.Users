import { Router, type Request, type Response } from 'express';
import isAuthorized from '../utils/isAuthorized';
import userIdValidator from '../validators/requests/userIdValidator';
import getUserProfilePictureAction from '../actions/getUserProfilePictureAction';
import getUserProfileAction from '../actions/getUserProfileAction';

const router = Router();

router.get(
  '/:userId/profile-picture',
  /*isAuthorized,*/
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const profilePictureUrl = await getUserProfilePictureAction(
        req.params.userId!
      );
      return res.status(200).json({ avatarUrl: profilePictureUrl });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
);

router.get(
  '/:userId',
  /*isAuthorized,*/
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const userProfile = await getUserProfileAction(req.params.userId!);
      return res.status(200).json({ userProfile });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
