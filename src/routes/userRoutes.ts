import { Router, type Request, type Response } from 'express';
import isAuthorized from '../utils/isAuthorized';
import userIdValidator from '../validators/requests/userIdValidator';
import getUserProfilePictureAction from '../actions/getUserProfilePictureAction';
import getUserProfileAction from '../actions/getUserProfileAction';

const router = Router();

/**
 * @openapi
 * /api/users/{userId}/profile-picture:
 *   get:
 *     summary: Get User Profile Picture URL
 *     description: Retrieves the profile picture URL for a given user ID.
 *     parameters:
 *       - in: path
 *     responses:
 *       200:
 *         description: A user's profile picture URL.
 *         content: application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatarUrl:
 *                 type: string
 *       500:
 *         description: Server error or invalid user ID.
 *         content: application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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

/**
 * @openapi
 * /api/users/{userId}:
 *   get:
 *     summary: Get User Profile Picture Details
 *     description: Retrieves the profile details for a given user ID.
 *     parameters:
 *       - in: path
 *     responses:
 *       200:
 *         description: A user's profile details.
 *         content: application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userProfile:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   displayName:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   gender:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   avatarUrl:
 *                     type: string
 *                   userType:
 *                     type: string
 *       500:
 *         description: Server error or invalid user ID.
 *         content: application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
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
