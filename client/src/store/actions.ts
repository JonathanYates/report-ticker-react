import {Action} from 'redux';
import {Report, ReportSummary, ReportUpdate} from '../models/report.models';

export interface ReportsAction extends Action {
  payload: any;
}

export enum ActionTypes {
  GET_REPORTS_REQUEST = 'GET_REPORTS_REQUEST',
  GET_REPORTS_SUCCESS = 'GET_REPORTS_SUCCESS',
  
  GET_REPORTS_UPDATE = 'GET_REPORTS_UPDATE',
  ON_REPORTS_UPDATE = 'ON_REPORTS_UPDATE',
  END_REPORTS_UPDATES = 'END_REPORTS_UPDATES',

  GET_REPORT_REQUEST = 'GET_REPORT_REQUEST',
  GET_REPORT_SUCCESS = 'GET_REPORT_SUCCESS',

  GET_REPORT_UPDATES = 'GET_REPORT_UPDATES',
  ON_REPORT_UPDATE = 'ON_REPORT_UPDATE',
  END_REPORT_UPDATES = 'END_REPORT_UPDATES'
}

export const getReportsRequestAction = () => ({ type: ActionTypes.GET_REPORTS_REQUEST });
export const getReportsSuccessAction = (reports: ReportSummary[]) => ({ type: ActionTypes.GET_REPORTS_SUCCESS, payload: reports });

export const getReportsUpdateAction = () => ({ type: ActionTypes.GET_REPORTS_UPDATE });
export const onReportsUpdateAction = (update: ReportSummary) => ({ type: ActionTypes.ON_REPORTS_UPDATE, payload: update });
export const endReportsUpdateAction = () => ({ type: ActionTypes.END_REPORTS_UPDATES });

export const getReportRequestAction = (id: string) => ({ type: ActionTypes.GET_REPORT_REQUEST, payload: id });
export const getReportSuccessAction = (report: Report) => ({ type: ActionTypes.GET_REPORT_SUCCESS, payload: report });

export const getReportUpdatesAction = (id: string) => ({ type: ActionTypes.GET_REPORT_UPDATES, payload: id });
export const onReportUpdateAction = (update: ReportUpdate) => ({ type: ActionTypes.ON_REPORT_UPDATE, payload: update });
export const endReportUpdatesAction = (id: string) => ({ type: ActionTypes.END_REPORT_UPDATES, payload: id });
