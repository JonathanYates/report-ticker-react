import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Express} from 'express-serve-static-core';
import {Server} from 'http';
import {Request, Response, NextFunction} from 'express-serve-static-core';
import {ReportsRouter} from './reports.router';
import {ReportsRepository} from './reports.repository';
import {TickerService} from './ticker.service';
import {ReportsController} from './reports.controller';

export class ReportsServer {

  public start() {
    let app = express();
    let http = require('http');
    let server = http.Server(app);
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

    let repository = new ReportsRepository();
    const controller = new ReportsController(repository);
    let router = new ReportsRouter(controller);

    app.use('/api/reports', router.routes);

    app.get('/*', (req: Request, res: Response) => {
      res.sendFile('./public/index.html');
    });
    
    let tickerService = new TickerService(server, repository);
    tickerService.listen();
  }

  private listen(server: Server) {
    let port = process.env.PORT || 3200;
    server.listen(port, function () {
      console.log('report ticker server listening on port' + port);
    });
  }
}




