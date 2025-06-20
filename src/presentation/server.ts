import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  public readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`server started on port ${this.port}`);
    });
  }
}
