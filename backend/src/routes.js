import { Router } from 'express';

const routes = new Router();

import SessionController from './app/controllers/SessionController';

routes.post('/session', SessionController.store);
