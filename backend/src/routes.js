import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/authMiddleware';

import FileController from './app/controllers/FileController';
import DeliveryManController from './app/controllers/DeliveryMan';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

class Routes {

  constructor() {
    this.routes = new Router();

    this.createRoutes();
  }

  createRoutes() {

    this.routes.post('/sessions', SessionController.store);

    this.routes.use(authMiddleware);

    this.routes.put('/recipients', RecipientController.update);
    this.routes.post('/recipients', RecipientController.store);

    this.routes.get('/delivery-man', DeliveryManController.index);
    this.routes.post('/delivery-man', DeliveryManController.store);
    this.routes.put('/delivery-man/:id', DeliveryManController.update);
    this.routes.delete('/delivery-man/:id', DeliveryManController.delete);

    const upload = multer(multerConfig);
    this.routes.post('/files', upload.single('file'), FileController.store);
  }
}

export default new Routes().routes;
