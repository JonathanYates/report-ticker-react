import {ReportsService} from '../services/reports.service';
import * as actions from './actions';
import {Subscription} from 'rxjs/Subscription';
import {ReportUpdate} from '../models/report.models';

export class ReportTickerMiddleware {

  private reportSummaryUpdateSubscription: Subscription;
  private reportUpdatesSubscription: Subscription;

  constructor(private reportService: ReportsService) {}

  private getReportsRequest = store=> next => action => {
    if (action.type === actions.ActionTypes.GET_REPORTS_REQUEST) {
      this.reportService.getReports()
        .subscribe(reports => {
          store.dispatch(actions.getReportsSuccessAction(reports));
          store.dispatch(actions.getReportsUpdateAction());
        });
    }
    return next(action);
  };

  private getReportsUpdate = store => next => action => {
    if (action.type === actions.ActionTypes.GET_REPORTS_REQUEST) {
      this. reportSummaryUpdateSubscription = this.reportService.OnUpdates()
        .subscribe(update => {
          store.dispatch(actions.onReportsUpdateAction(update))
        });
    }
    return next(action);
  };

  private endReportsUpdate = store => next => action => {
    if (action.type === actions.ActionTypes.END_REPORTS_UPDATES) {
      if (this.reportSummaryUpdateSubscription && !this.reportSummaryUpdateSubscription.closed) {
        this.reportSummaryUpdateSubscription.unsubscribe();
      }
    }
    return next(action);
  };

  private getReportRequest = store => next => action => {
    if (action.type === actions.ActionTypes.GET_REPORT_REQUEST) {
      this.reportService.getReport(action.payload)
        .subscribe(report => {
          store.dispatch(actions.getReportSuccessAction(report));
          store.dispatch(actions.getReportUpdatesAction(report._id));
        });
    }
    return next(action);
  };

  private getReportUpdate = store => next => action => {
    if (action.type === actions.ActionTypes.GET_REPORT_UPDATES) {
      this.reportService.OnUpdate(action.payload)
        .subscribe((update: ReportUpdate) => {
          if (update && update.cells && update.cells.length > 0) {
            store.dispatch(actions.onReportUpdateAction(update))
          }
        });
    }
    return next(action);
  };

  private endReportUpdate = store => next => action => {
    if (action.type === actions.ActionTypes.END_REPORTS_UPDATES) {
      if (this.reportUpdatesSubscription && !this.reportUpdatesSubscription.closed) {
        this.reportUpdatesSubscription.unsubscribe();
      }
    }
    return next(action);
  };

  middleware = [
    this.getReportsRequest,
    this.getReportsUpdate,
    this.endReportsUpdate,
    this.getReportRequest,
    this.getReportUpdate,
    this.endReportUpdate
  ];

}