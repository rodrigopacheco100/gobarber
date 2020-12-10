import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/Mail/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUser';

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
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExist = await this.userRepository.findByEmail(email);

    if (!checkUserExist) {
      throw new AppError('User does not exists.');
    }

    await this.mailProvider.sendMail(email, '');
  }
}
