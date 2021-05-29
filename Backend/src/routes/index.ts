import {Router} from 'express';
import usersRouter from './users.routes';
import petsRouter from './pets.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pets', petsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
