import FakeStorageProvider from '@shared/container/providers/Storage/fakes/FakeStorage';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/User';
import UpdateUserAvatarService from './UpdateUserAvatar';

let userRepository: FakeUserRepository;
let storageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    storageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      storageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(user.avatar).toBe('avatar2.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'lllllll',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
