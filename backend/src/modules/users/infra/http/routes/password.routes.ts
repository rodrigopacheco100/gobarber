import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const sessionsRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

sessionsRouter.post('/forgot', forgotPasswordController.create);
sessionsRouter.post('/reset', resetPasswordController.create);

export default sessionsRouter;
