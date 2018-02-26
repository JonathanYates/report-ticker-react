import * as express from 'express';
import {ReportsController} from './reports.controller';

export class ReportsRouter {

  public routes = express.Router();

  constructor(private reportsController: ReportsController) {
    this.configure();
  }

  private configure() {
    this.routes.get('/', this.reportsController.getReports);
    this.routes.get('/:id', this.reportsController.getReport);
  }
}
