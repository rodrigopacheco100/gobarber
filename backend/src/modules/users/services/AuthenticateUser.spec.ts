import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/HashProvider';
import FakeUserRepository from '../repositories/fakes/User';

import AuthenticateUserService from './AuthenticateUser';
import CreateUserService from './CreateUser';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(userRepository, hashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const authenticateUser = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );

    const response = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate an user with wrong email/password', async () => {
    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(userRepository, hashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const authenticateUser = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'johndoe2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(
      authenticateUser.execute({
        email: 'johndoe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(
      authenticateUser.execute({
        email: 'johndoe2@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
