import { container } from 'tsyringe';

import IHashProvider from './Hash/models/IHashProvider';
import BCryptHashProvider from './Hash/implementations/BCryptProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
