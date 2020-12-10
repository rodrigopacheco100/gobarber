import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/Hash/fakes/HashProvider';
import FakeUserRepository from '../repositories/fakes/User';
import CreateUserService from './CreateUser';

describe('CreateUser', () => {
  it('should be able to create an user', async () => {
    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(userRepository, hashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@gmail.com');
    expect(user).toHaveProperty('password');
  });

  it('should not be able to create an user with same email', async () => {
    const userRepository = new FakeUserRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(userRepository, hashProvider);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
