import {Router} from 'express';
import UsersController from '../controllers/UsersControllers';
import EnsureAuthenticated from '../midlewares/auth';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/',EnsureAuthenticated, usersController.index);
usersRouter.get('/:id',EnsureAuthenticated, usersController.show);
usersRouter.put('/:id',EnsureAuthenticated, usersController.update);
usersRouter.delete('/:id',EnsureAuthenticated, usersController.delete);

export default usersRouter;
