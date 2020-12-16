import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

export default class UserTokenRepository implements IUserTokenRepository {
  public async generate(user_id): Promise<UserToken> {
    const userToken = new UserToken();
    return userToken;
  }
}
