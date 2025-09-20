import { Router, type Request, type Response } from 'express';
import isAuthorized from '../validators/requests/isAuthorized';
import userIdValidator from '../validators/requests/userIdValidator';
import getUserProfilePictureAction from '../actions/getUserProfilePictureAction';
import getUserProfileAction from '../actions/getUserProfileAction';
import userCanMakeUserUpdatesValidator from '../validators/requests/userCanMakeUserUpdatesValidator';
import userProfilePictureValidator from '../validators/requests/userProfilePictureValidator';
import {
  type UserProfileDataSchema,
  userProfileDataValidator
} from '../validators/requests/userProfileDataValidator';
import { userTypeValidator } from '../validators/requests/userTypeValidator';
import updateUserProfileAction from '../actions/updateUserProfileAction';
import updateUserTypeAction from '../actions/updateUserTypeAction';
import getErrorResponseJson from '../utils/getErrorResponseJson';

const router = Router();

/**
 * @swagger
 * /api/users/{userId}/profile-picture:
 *   get:
 *     summary: Get User Profile Picture URL
 *     description: Retrieves the profile picture URL for a given user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose profile picture URL is to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user's profile picture URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *       500:
 *         description: Server error or invalid user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get(
  '/:userId/profile-picture',
  isAuthorized,
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const avatarUrl = await getUserProfilePictureAction(req.params.userId!);
      return res.status(200).json({ avatarUrl });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/profile:
 *   get:
 *     summary: Get User Profile Details
 *     description: Retrieves the profile details for a given user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose profile data is to be fetched.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user's profile details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userProfile:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     displayName:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     avatarUrl:
 *                       type: string
 *                     userType:
 *                       type: string
 *       500:
 *         description: Server error or invalid user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get(
  '/:userId/profile',
  isAuthorized,
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const userProfile = await getUserProfileAction(req.params.userId!);
      return res.status(200).json({ userProfile });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

router.patch(
  ':userId/profile',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  userProfilePictureValidator,
  userProfileDataValidator,
  async (req: Request, res: Response) => {
    try {
      const updatedUserProfile = await updateUserProfileAction(
        req.params.id!,
        req.file,
        req.body as UserProfileDataSchema
      );
      return res.status(200).json({ userProfile: updatedUserProfile });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

router.patch(
  ':userId/user-type',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  userTypeValidator,
  async (req: Request, res: Response) => {
    try {
      const updatedUserType = await updateUserTypeAction(
        req.params.userId!,
        req.body.userType as string
      );
      return res.status(200).json({ userType: updatedUserType });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

export default router;
