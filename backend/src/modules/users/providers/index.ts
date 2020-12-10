import { container } from 'tsyringe';

import IHashProvider from './Hash/models/IHashProvider';
import BCryptHashProvider from './Hash/implementations/BCrypt';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
