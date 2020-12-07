import upload from '@config/upload';
import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.uploadsFolder, file),
    );

    return path.resolve(upload.uploadsFolder, file);
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadsFolder, file);

    const userAvatarFileExists = await fs.promises.stat(filePath);

    if (userAvatarFileExists) {
      await fs.promises.unlink(filePath);
    }
  }
}
