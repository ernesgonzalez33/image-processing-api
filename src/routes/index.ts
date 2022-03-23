import express, { Request, Response } from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to the main api page. Nothing to see here. Use "/api/images" to scale images'
  );
  console.log('Connected to main api');
});

routes.use('/images', images);

export default routes;
