import {Router} from 'express'
import AuthenticateController from '../controllers/AuthenticateController.js'
const authRouter = Router();



authRouter.get('/register',AuthenticateController.showRegister);
authRouter.post('/register',AuthenticateController.saveRegister);
authRouter.get('/login',AuthenticateController.showlogin);
authRouter.post('/login',AuthenticateController.enterSystem);
authRouter.get('/logout',AuthenticateController.closeSystem);

export default authRouter;




