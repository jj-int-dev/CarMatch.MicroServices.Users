import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import { MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES } from '../../utils/constants';

// Use memory storage to access file buffer (e.g., for Supabase upload)
const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (_request, file, callback) => {
  if (!ALLOWED_FILE_TYPES.hasOwnProperty(file.mimetype)) {
    return callback(
      new Error('Invalid file type. Only JPG, PNG, and WEBP are allowed.')
    );
  }
  callback(null, true);
};

// Multer config with limits and filter
const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter
}).single('profile_picture');

// Middleware wrapper
export default function (req: Request, res: Response, next: NextFunction) {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res
          .status(400)
          .json({ error: 'File too large. Maximum size is 1MB.' });
      }
      return res
        .status(400)
        .json({ error: `File validation error: ${err.message}` });
    } else if (err) {
      console.log(`Error occurred during file validation: ${err}`);
      return res.status(400).json({ error: 'Invalid file' });
    }

    // If no file uploaded, that's okay — just continue
    return next();
  });
}
