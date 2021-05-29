import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import 'express-async-errors';
import routes from './routes';
import './database/connection';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, resp: Response, next: NextFunction)=>{
  if(err instanceof AppError){
    return resp.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  console.log(err);

  return resp.status(500).json({
    status: 'error',
    message: 'Internal sever error'
  });
},
);

app.listen(3333, () => {  // tslint:disable-next-line:no-console
    console.log(':rocket: Server started on port 3333');
});

