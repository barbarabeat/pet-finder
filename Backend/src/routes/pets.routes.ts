import {Router} from 'express';

import PetsController from '../controllers/PetsControllers';
import UserPetsController from '../controllers/userPetsControllers';
import EnsureAuthenticated from '../midlewares/auth';

const petsRouter = Router();
const petsController = new PetsController();
const userPetsController = new UserPetsController();

petsRouter.post('/', EnsureAuthenticated, petsController.create);
petsRouter.get('/', petsController.index);
petsRouter.get('/:id', petsController.show);
petsRouter.put('/:id', EnsureAuthenticated, petsController.update);
petsRouter.delete('/:id', EnsureAuthenticated, petsController.delete);
petsRouter.get('/user-pets/:user_id', EnsureAuthenticated, userPetsController.userPetsList) ;

export default petsRouter;
