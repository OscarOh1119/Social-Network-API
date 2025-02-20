import express, { Request, Response, NextFunction } from 'express';
import db from './config/connection';
import routes from './routes';

const app: express.Application = express(); 
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', routes);


app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});

export default app;
