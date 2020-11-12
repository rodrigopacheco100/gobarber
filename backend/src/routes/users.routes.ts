import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUser';
import UpdateUserAvatarService from '../services/UpdateUserAvatar';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const createUserService = new CreateUserService();
  const { name, email, password } = request.body;

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return response.status(201).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
