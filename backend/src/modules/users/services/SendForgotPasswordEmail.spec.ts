import FakeMailProvider from '@shared/container/providers/Mail/fakes/FakeMail';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/User';
import SendForgotPasswordEmailService from './SendForgotPasswordEmail';

describe('SendForgotPasswordEmail', () => {
  it('should be able to send an email to recover the password', async () => {
    const userRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepository,
      fakeMailProvider,
    );

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
    const userRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      userRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
