import { container } from 'tsyringe';

import IStorageProvider from './Storage/models/IStorageProvider';
import DiskStorageProvider from './Storage/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
