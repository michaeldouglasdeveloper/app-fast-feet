import { Router } from 'express';

const routes = new Router();

import authMiddleware from './app/middlewares/authMiddleware';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

routes.post('/sessions', SessionController.store);

routes.put('/recipients', authMiddleware, RecipientController.update);
routes.post('/recipients', authMiddleware, RecipientController.store);

export default routes;
