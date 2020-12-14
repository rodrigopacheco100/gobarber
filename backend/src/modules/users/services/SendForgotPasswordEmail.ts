import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/Mail/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUser';
import IUserTokenRepository from '../repositories/IUserToken';

interface IRequest {
  email: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const userToken = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(email, userToken.token);
  }
}
