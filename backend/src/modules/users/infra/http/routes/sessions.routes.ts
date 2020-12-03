import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUser';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(201).json({ user, token });
});

export default sessionsRouter;
