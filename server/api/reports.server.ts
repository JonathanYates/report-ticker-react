import * as bodyParser from 'body-parser';
import * as express from 'express';
import {Express} from 'express-serve-static-core';
import {NextFunction, Request, Response} from 'express-serve-static-core';
import {Server} from 'http';
import {ReportsController} from './reports.controller';
import {ReportsRepository} from './reports.repository';
import {ReportsRouter} from './reports.router';
import {TickerService} from './ticker.service';

export class ReportsServer {

  public start() {
    const app = express();
    const http = require('http');
    const server = http.Server(app);
    this.configure(app, server);
    this.listen(server);
  }

  private configure(app: Express, server: Server) {

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.use(bodyParser.json());
    app.use(express.static('public'));

    const repository = new ReportsRepository();
    const controller = new ReportsController(repository);
    const router = new ReportsRouter(controller);

    app.use('/api/reports', router.routes);

    app.get('/*', (req: Request, res: Response) => {
      res.sendFile('./public/index.html');
    });
    
    const tickerService = new TickerService(server, repository);
    tickerService.listen();
  }

  private listen(server: Server) {
    const port = process.env.PORT || 3200;
    server.listen(port, () => {
      console.log('report ticker server listening on port' + port);
    });
  }
}




