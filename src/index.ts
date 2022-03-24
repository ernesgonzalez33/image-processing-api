import express, { Request, Response } from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response): void => {
  res.send(
    'Welcome to the root page of this api. Nothing to see here. Use "/api/images" to scale images'
  );
  console.log('Connected to root api');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
