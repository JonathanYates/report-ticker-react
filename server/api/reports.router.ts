import {ReportsController} from './reports.controller';
import * as express from 'express'

export class ReportsRouter {

  routes = express.Router();

  constructor(private reportsController: ReportsController) {
    this.configure();
  }

  private configure() {
    this.routes.get('/', this.reportsController.getReports);
    this.routes.get('/:id', this.reportsController.getReport);
  }
}
