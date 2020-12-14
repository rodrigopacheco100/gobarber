import FakeMailProvider from '@shared/container/providers/Mail/fakes/FakeMail';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/User';
import FakeUserTokenRepository from '../repositories/fakes/UserToken';
import SendForgotPasswordEmailService from './SendForgotPasswordEmail';

let userRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    userRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to send an email to recover the password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(sendMail).toBeCalled();
  });

  it('should not be able to recover the password from a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
