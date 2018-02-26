import {AppState} from './index';
import {ActionTypes, ReportsAction} from './actions';
import {Report, ReportSummary, ReportUpdate} from '../models/report.models';

export const appReducer = (state: AppState = {reports: []}, action: ReportsAction) => {
  switch (action.type) {

    case ActionTypes.GET_REPORTS_SUCCESS:
      const reports: ReportSummary[] = action.payload;
      return {
        ...state,
        reports: reports
      };

    case ActionTypes.ON_REPORTS_UPDATE:
      const update: ReportSummary = action.payload;
      return {
        ...state,
        reports: state.reports.map(report => report._id === update._id ? update : report)
      };

    case ActionTypes.GET_REPORT_SUCCESS:
      const report: Report = action.payload;
      return {
        ...state,
        selected: report
      };

    case ActionTypes.ON_REPORT_UPDATE:
      const reportUpdate: ReportUpdate = action.payload;

      if (state.selected && reportUpdate._id === state.selected._id) {
        return {
          ...state,
          selected: {
            ...state.selected,
            cells: state.selected.cells
              .map((row, rowIndex) =>
                row.map((cell, columnIndex) => {
                  let updatedCell = reportUpdate.cells
                    .find(cellUpdate => cellUpdate.rowIndex === rowIndex && cellUpdate.columnIndex === columnIndex);
                  return updatedCell ? updatedCell : cell;
                }))
          }
        };
      } else {
        return state;
      }


    default:
      return state;
  }
};