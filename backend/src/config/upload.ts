import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (request, file, cb) => {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${Date.now()}-${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
